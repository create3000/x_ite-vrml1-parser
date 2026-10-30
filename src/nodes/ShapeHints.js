import BaseNode from "./BaseNode.js";

export default class ShapeHints extends BaseNode
{
   constructor (X3D, name)
   {
      super (X3D, "ShapeHints", name);

      this .fields .set ("vertexOrdering", new X3D .Fields .SFString ("COUNTERCLOCKWISE"));
      this .fields .set ("shapeType",      new X3D .Fields .SFString ("SOLID"));
      this .fields .set ("faceType",       new X3D .Fields .SFString ("CONVEX"));
      this .fields .set ("creaseAngle",    new X3D .Fields .SFFloat ());
   }

   convert (converter)
   {
      console .log ("convert", this .typeName);
   }
};
