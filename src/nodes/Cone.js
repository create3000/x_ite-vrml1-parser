import BaseNode from "./BaseNode.js";

export default class Cone extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("parts",        new X3D .Fields .SFString ("ALL"));
      this .fields .set ("bottomRadius", new X3D .Fields .SFFloat (1));
      this .fields .set ("height",       new X3D .Fields .SFFloat (2));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("Cone");

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

      geometryNode .side         = this .fields .get ("parts") .getValue () .match (/ALL|SIDES/);
      geometryNode .bottom       = this .fields .get ("parts") .getValue () .match (/ALL|BOTTOM/);
      geometryNode .bottomRadius = this .fields .get ("bottomRadius");
      geometryNode .height       = this .fields .get ("height");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
