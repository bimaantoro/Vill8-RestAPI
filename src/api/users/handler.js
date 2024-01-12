class UsersHandler {
  constructor(usersService, validator) {
    this._usersService = usersService;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    const userPayload = this._validator.validateUserPayload(request.payload);

    const userId = await this._usersService.addUser(userPayload);

    const res = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
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
