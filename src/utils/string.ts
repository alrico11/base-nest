interface IDotToObvject {
  orderBy: string
  orderDirection: Object
}
export const dotToObject = ({orderBy,orderDirection} : IDotToObvject) => {
  // convert dot notation to object to {xx:{aa:value}}
  const keys = orderBy.split('.');
  return keys.reduceRight(
    (acc, key, index) => {
      if (index === keys.length - 1) {
        return { [key]: orderDirection };
      } else {
        return { [key]: acc };
      }
    },
    {} as Record<string, any>,
  );
};
