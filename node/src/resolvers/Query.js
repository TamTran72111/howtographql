function feed(parent, args, context) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  return {
    links: context.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    }),
    count: context.prisma.link.count({ where }),
  };
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
