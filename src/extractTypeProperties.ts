import { types as t } from "@babel/core";
import { TypePropertyMap } from "./types";

export default function extractTypeProperties(
  node: any,
  types: TypePropertyMap,
): [t.TSPropertySignature[], boolean] {
  let isUnion = t.isTSUnionType(node);
  const properties: t.TSPropertySignature[] = [];
  const mapToPropertySignature = (data: any[]) => {
    data.forEach(prop => {
      if (t.isTSPropertySignature(prop)) {
        properties.push(prop);
      }
    });
  };

  // Props
  if (t.isIdentifier(node)) {
    if (types[node.name]) {
      properties.push(...types[node.name]);
    }

    // Props
  } else if (t.isTSTypeReference(node)) {
    const [recusionProperties, recusionIsUnion] = extractTypeProperties(
      node.typeName,
      types,
    );
    isUnion = isUnion || recusionIsUnion;
    properties.push(...recusionProperties);

    // interface {}
  } else if (t.isTSInterfaceDeclaration(node)) {
    (node.extends || []).forEach(ext => {
      const [recusionProperties, recusionIsUnion] = extractTypeProperties(
        ext.expression,
        types,
      );
      isUnion = isUnion || recusionIsUnion;
      properties.push(...recusionProperties);
    });

    mapToPropertySignature(node.body.body);

    // type = {}
  } else if (t.isTSTypeAliasDeclaration(node)) {
    const [recusionProperties, recusionIsUnion] = extractTypeProperties(
      node.typeAnnotation,
      types,
    );
    isUnion = isUnion || recusionIsUnion;
    properties.push(...recusionProperties);

    // {}
  } else if (t.isTSTypeLiteral(node)) {
    mapToPropertySignature(node.members);

    // Props & {}, Props | {}
  } else if (t.isTSIntersectionType(node) || t.isTSUnionType(node)) {
    node.types.forEach(intType => {
      const [recusionProperties, recusionIsUnion] = extractTypeProperties(
        intType,
        types,
      );
      isUnion = isUnion || recusionIsUnion;
      properties.push(...recusionProperties);
    });
  }

  return [properties, isUnion];
}
