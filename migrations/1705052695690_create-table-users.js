/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    nama_desa: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    alamat_desa: {
      type: 'TEXT',
      notNull: false,
    },
    provinsi: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    kota_kabupaten: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    nama_narahubung: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    nomor_telepon: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
