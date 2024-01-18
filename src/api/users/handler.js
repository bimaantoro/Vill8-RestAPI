class UsersHandler {
  constructor(usersService, validator) {
    this._usersService = usersService;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const {
      email, password, namaNarahubung, nomorTelepon,
    } = request.payload;

    await this._usersService.addUser({
      email, password, namaNarahubung, nomorTelepon,
    });

    const res = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
    });
    res.code(201);
    return res;
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;

    const user = await this._usersService.getUserById(id);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
