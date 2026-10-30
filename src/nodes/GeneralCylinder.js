import BaseNode from "./BaseNode.js";

export default class GeneralCylinder extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("spine",        X3D .Fields .MFVec3f .fromArray ([ 0, 0, 0,  0, 1, 0]));
      this .fields .set ("crossSection", X3D .Fields .MFVec2f .fromArray ([ -1, 1,  -1, -1,  1, -1,  1, 1]));
      this .fields .set ("profile",      X3D .Fields .MFVec2f .fromArray ([ 1, -1,  1, 1 ]));
      this .fields .set ("twist",        X3D .Fields .MFVec2f .fromArray ([ 0, -1,  0, 1 ]));
      this .fields .set ("parts",        new X3D .Fields .SFString ("ALL"));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("Cylinder");

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
      {
         const shapeHints = converter .shapeHints .at (-1);

         geometryNode .ccw         = shapeHints .ccw;
         geometryNode .solid       = shapeHints .solid;
         geometryNode .convex      = shapeHints .convex;
         geometryNode .creaseAngle = shapeHints .creaseAngle;
      }

      geometryNode .spine        = this .fields .get ("spine");
      geometryNode .crossSection = this .fields .get ("crossSection");
      //geometryNode .orientation  = this .fields .get ("twist");
      //geometryNode .scale        = this .fields .get ("profile");
      geometryNode .beginCap     = this .fields .get ("parts") .getValue () .match (/ALL|BOTTOM/);
      geometryNode .endCap       = this .fields .get ("parts") .getValue () .match (/ALL|TOP/);

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};
