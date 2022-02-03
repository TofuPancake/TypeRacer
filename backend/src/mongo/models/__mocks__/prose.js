export const Prose = {
  async countDocuments() { return 1; },
  async findById() {
    return {
      sentences: [
        '1', '2', '3',
      ],
    };
  },
};
