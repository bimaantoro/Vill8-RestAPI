/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('university_profiles', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama_desa: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: false,
    },
    provinsi: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    kota: {
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
  pgm.dropTable('university_profiles');
};
