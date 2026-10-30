import BaseNode from "./BaseNode.js";

export default class Cube extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("width",  new X3D .Fields .SFFloat (2));
      this .fields .set ("height", new X3D .Fields .SFFloat (2));
      this .fields .set ("depth",  new X3D .Fields .SFFloat (2));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("Box");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, shapeNode);

      // Assign values.

      shapeNode .appearance = appearanceNode;
      shapeNode .geometry   = geometryNode;

      appearanceNode .material         = converter .materials         .at (-1);
      appearanceNode .texture          = converter .textures          .at (-1);
      appearanceNode .textureTransform = converter .textureTransforms .at (-1);

      if (converter .shapeHints .length)
         geometryNode .solid = converter .shapeHints .at (-1) .solid;

      geometryNode .size .x = this .fields .get ("width")  .getValue ();
      geometryNode .size .y = this .fields .get ("height") .getValue ();
      geometryNode .size .z = this .fields .get ("depth")  .getValue ();

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
