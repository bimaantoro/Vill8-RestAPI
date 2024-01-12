const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const NotFoundError = require('../exceptions/NotFoundError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({
    email, password, namaDesa, alamatDesa, provinsi, kotaKabupaten, namaNarahubung, nomorTelepon,
  }) {
    await this.verifyNewEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        email,
        hashedPassword,
        namaDesa,
        alamatDesa,
        provinsi,
        kotaKabupaten,
        namaNarahubung,
        nomorTelepon,
      ],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return rows[0].id;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, email, nama_narahubung FROM users WHERE id = $1',
      values: [userId],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return rows[0];
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const { rows } = await this._pool.query(query);

    if (rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Email sudah digunakan');
    }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };
    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new InvariantError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
