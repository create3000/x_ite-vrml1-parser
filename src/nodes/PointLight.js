import BaseNode from "./BaseNode.js";

export default class PointLight extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("startIndex", new X3D .Fields .SFInt32 ());
      this .fields .set ("numPoints",  new X3D .Fields .SFInt32 (-1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("PointSet");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, shapeNode);

      // Assign values.

      shapeNode .appearance = appearanceNode;
      shapeNode .geometry   = geometryNode;

      appearanceNode .material         = converter .materials         .at (-1);
      appearanceNode .texture          = converter .textures          .at (-1);
      appearanceNode .textureTransform = converter .textureTransforms .at (-1);

      const coord = converter .coords .at (-1);

      if (coord)
      {
         if (this .fields .get ("startIndex") .getValue () === 0)
         {
            geometryNode .coord = coord;
         }
         else
         {
            const coordNode = converter .scene .createNode ("Coordinate");

            const
               start  = Math .max (this .fields .get ("startIndex") .getValue (), 0),
               length = Math .max (this .fields .get ("numPoints")  .getValue (), 0);

            coordNode .point = coord .point .slice (start, start + length);

            geometryNode .coord = coordNode;
         }
      }

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
