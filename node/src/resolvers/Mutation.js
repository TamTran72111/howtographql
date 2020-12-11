const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, args, context, info) {
  const { userId } = context;
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
}

async function updateLink(parent, args, context) {
  const { userId, prisma } = context;
  const link = await prisma.link.findUnique({
    where: { id: parseInt(args.id) },
  });
  if (!link) {
    return null;
  }
  if (userId !== link.postedById) {
    throw new Error('Unauthorized');
  }
  return prisma.link.update({
    where: { id: link.id },
    data: {
      url: args.url,
      description: args.description,
    },
  });
}

async function deleteLink(parent, args, context) {
  const { userId, prisma } = context;
  const link = await prisma.link.findUnique({
    where: { id: parseInt(args.id) },
  });
  if (!link) {
    return null;
  }
  if (userId !== link.postedById) {
    throw new Error('Unauthorized');
  }
  return prisma.link.delete({
    where: { id: link.id },
  });
}

module.exports = {
  login,
  signup,
  post,
  updateLink,
  deleteLink,
};
