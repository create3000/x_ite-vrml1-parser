import BaseNode from "./BaseNode.js";

export default class ShapeHints extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("vertexOrdering", new X3D .Fields .SFString ("COUNTERCLOCKWISE"));
      this .fields .set ("shapeType",      new X3D .Fields .SFString ("SOLID"));
      this .fields .set ("faceType",       new X3D .Fields .SFString ("CONVEX"));
      this .fields .set ("creaseAngle",    new X3D .Fields .SFFloat ());
   }

   get ccw ()
   {
      return this .fields .get ("vertexOrdering") .getValue () !== "CLOCKWISE";
   }

   get solid ()
   {
      return this .fields .get ("shapeType") .getValue () !== "UNKNOWN_SHAPE_TYPE";
   }

   get convex ()
   {
      return this .fields .get ("shapeType") .getValue () !== "UNKNOWN_FACE_TYPE";
   }

   get creaseAngle ()
   {
      return this .fields .get ("creaseAngle") .getValue ();
   }

   convert (converter)
   {
      converter .shapeHints .push (this);
   }
};
