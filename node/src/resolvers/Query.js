function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

function link(parent, args, context) {
  return context.prisma.link.findFirst({
    where: { id: parseInt(args.id) },
  });
}

module.exports = {
  feed,
  link,
};
