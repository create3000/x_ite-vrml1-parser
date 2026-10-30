import BaseNode from "./BaseNode.js";

export default class PerspectiveCamera extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("position",      new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("orientation",   new X3D .Fields .SFRotation ());
      this .fields .set ("focalDistance", new X3D .Fields .SFFloat (5));
      this .fields .set ("heightAngle",   new X3D .Fields .SFFloat (0.785398));
      this .fields .set ("nearDistance",  new X3D .Fields .SFFloat (1));
      this .fields .set ("farDistance",   new X3D .Fields .SFFloat (10));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const viewpointNode = converter .scene .createNode ("OrthoViewpoint");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, viewpointNode);

      // Assign values.

      viewpointNode .position     = this .fields .get ("position");
      viewpointNode .orientation  = this .fields .get ("orientation");
      viewpointNode .fieldOfView  = this .fields .get ("heightAngle");
      viewpointNode .nearDistance = this .fields .get ("nearDistance");
      viewpointNode .farDistance  = this .fields .get ("nearDistance");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (viewpointNode);
      else
         converter .scene .rootNodes .push (viewpointNode);
   }
};
