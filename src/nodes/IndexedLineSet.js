import BaseNode from "./BaseNode.js";

export default class IndexedLineSet extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("coordIndex",        new X3D .Fields .MFInt32 (0));
      this .fields .set ("materialIndex",     new X3D .Fields .MFInt32 (-1));
      this .fields .set ("normalIndex",       new X3D .Fields .MFInt32 (-1)),
      this .fields .set ("textureCoordIndex", new X3D .Fields .MFInt32 (-1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("IndexedLineSet");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, shapeNode);

      // Assign values.

      shapeNode .appearance = appearanceNode;
      shapeNode .geometry   = geometryNode;

      appearanceNode .material         = converter .materials         .at (-1);
      appearanceNode .texture          = converter .textures          .at (-1);
      appearanceNode .textureTransform = converter .textureTransforms .at (-1);

      geometryNode .coordIndex = this .fields .get ("coordIndex");
      geometryNode .coord      = converter .coords    .at (-1);

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
