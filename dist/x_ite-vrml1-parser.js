/******/ (() => { // webpackBootstrap

;// ./node_modules/x_ite-extension/dist/x_ite-extension.js
/******/ // The require scope
/******/ var __nested_webpack_require_43__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nested_webpack_require_43__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nested_webpack_require_43__.o(definition, key) && !__nested_webpack_require_43__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nested_webpack_require_43__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __nested_webpack_exports__ = {};
/* harmony export */ __nested_webpack_require_43__.d(__nested_webpack_exports__, {
/* harmony export */   A: () => (x_ite_extension)
/* harmony export */ });
function register (callback)
{
   const X3D = window [Symbol .for ("X_ITE.X3D")];

   if (X3D)
      callback (X3D);
   else
      getExtensions () .push (callback);
};

function getExtensions ()
{
   const
      _extensions = Symbol .for ("X_ITE.extensions"),
      extensions  = window [_extensions];

   if (Array .isArray (extensions))
      return extensions;

   return window [_extensions] = [ ];
}

/* harmony default export */ const x_ite_extension = (register);

const __webpack_exports__default = __nested_webpack_exports__.A;


;// ./src/nodes/BaseNode.js

class BaseNode
{
   constructor (X3D, typeName, name)
   {
      this .X3D      = X3D;
      this .typeName = typeName;
      this .name     = name;
      this .fields   = new Map ();

      this .fields .set ("children", [ ]);
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         const transform = converter .scene .etNamedNode (this .name);

         // Add root node if needed or add as child.

         if (converter .transforms .length)
            converter .groups .at (-1) .children .push (transform);
         else
            converter .scene .rootNodes .push (transform);

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert ()
   {
      console .log ("VRML1Parser: convert:", this .typeName);
   }
};

;// ./src/nodes/AsciiText.js


class AsciiText extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("string",        new X3D .Fields .MFString ());
      this .fields .set ("spacing",       new X3D .Fields .SFFloat (1));
      this .fields .set ("justification", new X3D .Fields .SFString ("LEFT"));
      this .fields .set ("width",         new X3D .Fields .MFFloat ());
   }
};

;// ./src/nodes/Background.js


class Background extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("groundColors", new X3D .Fields .MFColor ());
      this .fields .set ("skyColors",    new X3D .Fields .MFColor (new X3D .Fields .SFColor ()));
      this .fields .set ("scenery",      new X3D .Fields .MFString (""));
   }
};

;// ./src/nodes/CollideStyle.js


class CollideStyle extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("collide", new X3D .Fields .SFBool ());
      this .fields .set ("proxy",   new X3D .Fields .SFNode ());
   }
};

;// ./src/nodes/Cone.js


class Cone extends BaseNode
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

;// ./src/nodes/Coordinate3.js


class Coordinate3 extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .coords .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const coordNode = converter .scene .createNode ("Coordinate");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, coordNode);

      // Assign values.

      coordNode .point = this .fields .get ("point");

      converter .coords .push (coordNode);
   }
};

;// ./src/nodes/Cube.js


class Cube extends BaseNode
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

;// ./src/nodes/CustomNode.js


class CustomNode extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);
   }

   convert ()
   { }
};

;// ./src/nodes/Cylinder.js


class Cylinder extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("parts",  new X3D .Fields .SFString ("ALL"));
      this .fields .set ("radius", new X3D .Fields .SFFloat (1));
      this .fields .set ("height", new X3D .Fields .SFFloat (2));
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
         geometryNode .solid = converter .shapeHints .at (-1) .solid;

      geometryNode .side   = this .fields .get ("parts") .getValue () .match (/ALL|SIDES/);
      geometryNode .top    = this .fields .get ("parts") .getValue () .match (/ALL|TOP/);
      geometryNode .bottom = this .fields .get ("parts") .getValue () .match (/ALL|BOTTOM/);
      geometryNode .radius = this .fields .get ("radius");
      geometryNode .height = this .fields .get ("height");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};

;// ./src/nodes/DirectedSound.js


class DirectedSound extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",        new X3D .Fields .MFString ());
      this .fields .set ("description", new X3D .Fields .SFString ());
      this .fields .set ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .set ("location",    new X3D .Fields .SFVec3f ());
      this .fields .set ("direction",   new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("minRange",    new X3D .Fields .SFFloat (10));
      this .fields .set ("maxRange",    new X3D .Fields .SFFloat (10)),
      this .fields .set ("minAngle",    new X3D .Fields .SFFloat (0.785398));
      this .fields .set ("maxAngle",    new X3D .Fields .SFFloat (0.785398));
      this .fields .set ("loop",        new X3D .Fields .SFBool (false));
      this .fields .set ("start",       new X3D .Fields .SFTime ());
      this .fields .set ("pause",       new X3D .Fields .SFTime ());
   }
};

;// ./src/nodes/DirectionalLight.js


class DirectionalLight extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("on",        new X3D .Fields .SFBool (true));
      this .fields .set ("intensity", new X3D .Fields .SFFloat (1));
      this .fields .set ("color",     new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("direction", new X3D .Fields .SFVec3f (0, 0, -1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const lightNode = converter .scene .createNode ("DirectionalLight");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, lightNode);

      // Assign values.

      lightNode .on          = this .fields .get ("on");
      lightNode .intensity   = this .fields .get ("intensity");
      lightNode .color       = this .fields .get ("color");
      lightNode .direction   = this .fields .get ("direction");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (lightNode);
      else
         converter .scene .rootNodes .push (lightNode);
   }
};

;// ./src/nodes/ElevationGrid.js


class ElevationGrid extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("verticesPerRow",    new X3D .Fields .SFInt32 ());
      this .fields .set ("verticesPerColumn", new X3D .Fields .SFInt32 ());
      this .fields .set ("gridStep",          new X3D .Fields .SFVec2f ());
      this .fields .set ("height",            new X3D .Fields .MFFloat ());
   }
};

;// ./src/nodes/Environment.js


class Environment extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("ambientIntensity", new X3D .Fields .SFFloat (0.2));
      this .fields .set ("ambientColor",     new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("attenuation",      new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("fogType",          new X3D .Fields .SFString ("NONE"));
      this .fields .set ("fogColor",         new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("fogVisibility",    new X3D .Fields .SFFloat ());
   }
};

;// ./src/nodes/FontStyle.js


class FontStyle extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("size",   new X3D .Fields .SFFloat (10));
      this .fields .set ("family", new X3D .Fields .SFString ("SERIF"));
      this .fields .set ("style",  new X3D .Fields .SFString ("NONE"));
   }
};

;// ./src/nodes/GeneralCylinder.js


class GeneralCylinder extends BaseNode
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
         geometryNode   = converter .scene .createNode ("Extrusion");

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

;// ./src/nodes/Group.js


class Separator extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);
   }

   convert (converter)
   {
      // Convert child

      for (const node of this .fields .get ("children"))
         node .convert (converter);
   }
};

;// ./src/nodes/IndexedFaceSet.js


class IndexedFaceSet extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("vertexOrdering",    new X3D .Fields .SFString ("COUNTERCLOCKWISE"));
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
         geometryNode   = converter .scene .createNode ("IndexedFaceSet");

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

      // XXX: Always set solid to false.
      geometryNode .solid = false;

      if (converter .normalBindings .length)
      {
         if (converter .normalBindings .at (-1) .value === "OVERALL")
         {
            for (const index of this .fields .get ("coordIndex"))
               geometryNode .normalIndex .push (index < 0 ? -1 : 0);
         }
         else if (converter .normalBindings .at (-1) .value === "PER_FACE")
         {
            geometryNode .normalPerVertex = false;
         }
         else if (converter .normalBindings .at (-1) .value === "PER_FACE_INDEXED")
         {
            geometryNode .normalPerVertex = false;
            geometryNode .normalIndex     = this .fields .get ("normalIndex");
         }
         else if (converter .normalBindings .at (-1) .value === "PER_VERTEX")
         ;
         else //if (converter .normalBindings .at (-1) .value === "PER_VERTEX_INDEXED")
         {
            geometryNode .normalIndex = this .fields .get ("normalIndex");
         }
      }
      else
      {
         geometryNode .normalIndex = this .fields .get ("normalIndex");
      }

      geometryNode .texCoordIndex = this .fields .get ("textureCoordIndex");
      geometryNode .coordIndex    = this .fields .get ("coordIndex");

      geometryNode .texCoord = converter .texCoords .at (-1);
      geometryNode .normal   = converter .normals   .at (-1);
      geometryNode .coord    = converter .coords    .at (-1);

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};

;// ./src/nodes/IndexedLineSet.js


class IndexedLineSet extends BaseNode
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

;// ./src/nodes/Info.js


class Info extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("string", new X3D .Fields .SFString ());
   }

   convert (converter)
   {
      // NO USE!

      // Create nodes.

      if (converter .transforms .length)
      {
         const metadataNode = converter .scene .createNode ("MetadataString");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, metadataNode);

         // Assign values.

         metadataNode .name      = "Info";
         metadataNode .reference = converter .scene .getBrowser () .providerURL;
         metadataNode .value     = [ this .fields .get ("string") .getValue () ];

         converter .groups .at (-1) .metadata = metadataNode;
      }
      else
      {
         // Create nodes.

         const infoNode = converter .scene .createNode ("WorldInfo");

         // Set name.

         // Assign values.

         infoNode .title = "Info";
         infoNode .info  = [ this .fields .get ("string") .getValue () ];

         converter .scene .rootNodes .push (infoNode);
      }
   }
};

;// ./src/nodes/LOD.js


class LOD extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("range",  new X3D .Fields .MFFloat (-1));
      this .fields .set ("center", new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform"),
         lodNode       = converter .scene .createNode ("LOD");

      // Set values.

      transformNode .children .push (lodNode);

      lodNode .range  = this .fields .get ("range");
      lodNode .center = this .fields .get ("center");

      // Add root node if needed or add as child.

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (transformNode);
      else
         converter .scene .rootNodes .push (transformNode);

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, transformNode);

      // Convert children.

      converter .save ();
      converter .transforms .push (transformNode);
      converter .groups     .push (lodNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};

;// ./src/nodes/Material.js


class Material extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec3f ());

      this .fields .set ("ambientColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.2, 0.2, 0.2)));
      this .fields .set ("diffuseColor",  new X3D .Fields .MFColor (new X3D .Fields .SFColor (0.8, 0.8, 0.8)));
      this .fields .set ("specularColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("emissiveColor", new X3D .Fields .MFColor (new X3D .Fields .SFColor (0, 0, 0)));
      this .fields .set ("shininess",     new X3D .Fields .MFFloat (0.2));
      this .fields .set ("transparency",  new X3D .Fields .MFFloat (0));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .materials .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const materialNode = converter .scene .createNode ("Material");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, materialNode);

      // Assign values.

      if (this .fields .get ("ambientColor") .length)
      {
         const hsv = this .fields .get ("ambientColor") [0] .getHSV ();

         materialNode .ambientIntensity = hsv [2];
      }

      if (this .fields .get ("diffuseColor") .length)
         materialNode .diffuseColor = this .fields .get ("diffuseColor") [0];

      if (this .fields .get ("specularColor") .length)
         materialNode .specularColor = this .fields .get ("specularColor") [0];

      if (this .fields .get ("emissiveColor") .length)
         materialNode .emissiveColor = this .fields .get ("emissiveColor") [0];

      if (this .fields .get ("shininess") .length)
         materialNode .shininess = this .fields .get ("shininess") [0];

      if (this .fields .get ("transparency") .length)
         materialNode .transparency = this .fields .get ("transparency") [0];

      converter .materials .push (materialNode);
   }
};

;// ./src/nodes/MaterialBinding.js


class MaterialBinding extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("value", new X3D .Fields .SFString ("OVERALL"));
   }

   convert (converter)
   {
      converter .materialBindings .push (this);
   }
};

;// ./src/nodes/MatrixTransform.js


class MatrixTransform extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("matrix", new X3D .Fields .SFMatrix4f ());
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      matrix = matrix .multLeft (this .fields .get ("matrix"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};

;// ./src/nodes/NavigationInfo.js


class NavigationInfo extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("type",            new X3D .Fields .MFString ("walk"));
      this .fields .set ("speed",           new X3D .Fields .SFFloat (1));
      this .fields .set ("collisionRadius", new X3D .Fields .SFFloat (1));
      this .fields .set ("headlight",       new X3D .Fields .SFBool (true));
   }
};

;// ./src/nodes/Normal.js


class Normal extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("vector", new X3D .Fields .MFVec3f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .normals .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const normalNode = converter .scene .createNode ("Normal");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, normalNode);

      // Assign values.

      normalNode .vector = this .fields .get ("vector");

      converter .normals .push (normalNode);
   }
};

;// ./src/nodes/NormalBinding.js


class NormalBinding extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("value", new X3D .Fields .SFString ());
   }

   get value ()
   {
      return this .fields .get ("value") .getValue ();
   }

   convert (converter)
   {
      converter .normalBindings .push (this);
   }
};

;// ./src/nodes/OrthographicCamera.js


class OrthographicCamera extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("position",      new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("orientation",   new X3D .Fields .SFRotation ());
      this .fields .set ("focalDistance", new X3D .Fields .SFFloat (5));
      this .fields .set ("height",        new X3D .Fields .SFFloat (2));
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

      const height = this .fields .get ("height") .getValue ();

      viewpointNode .position     = this .fields .get ("position");
      viewpointNode .orientation  = this .fields .get ("orientation");
      viewpointNode .fieldOfView  = [ -height / 2, -height / 2, height / 2, height / 2 ];
      viewpointNode .nearDistance = this .fields .get ("nearDistance");
      viewpointNode .farDistance  = this .fields .get ("farDistance");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (viewpointNode);
      else
         converter .scene .rootNodes .push (viewpointNode);
   }
};

;// ./src/nodes/PerspectiveCamera.js


class PerspectiveCamera extends BaseNode
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

      const viewpointNode = converter .scene .createNode ("Viewpoint");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, viewpointNode);

      // Assign values.

      viewpointNode .position     = this .fields .get ("position");
      viewpointNode .orientation  = this .fields .get ("orientation");
      viewpointNode .fieldOfView  = this .fields .get ("heightAngle");
      viewpointNode .nearDistance = this .fields .get ("nearDistance");
      viewpointNode .farDistance  = this .fields .get ("farDistance");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (viewpointNode);
      else
         converter .scene .rootNodes .push (viewpointNode);
   }
};

;// ./src/nodes/PointLight.js


class PointLight extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("on",        new X3D .Fields .SFBool (true));
      this .fields .set ("intensity", new X3D .Fields .SFFloat (1));
      this .fields .set ("color",     new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("location",  new X3D .Fields .SFVec3f (0, 0, 1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const lightNode = converter .scene .createNode ("PointLight");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, lightNode);

      // Assign values.

      lightNode .on          = this .fields .get ("on");
      lightNode .intensity   = this .fields .get ("intensity");
      lightNode .color       = this .fields .get ("color");
      lightNode .location    = this .fields .get ("location");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (lightNode);
      else
         converter .scene .rootNodes .push (lightNode);
   }
};

;// ./src/nodes/PointSet.js


class PointSet extends BaseNode
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

;// ./src/nodes/PointSound.js


class PointSound extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",        new X3D .Fields .MFString ());
      this .fields .set ("description", new X3D .Fields .SFString ());
      this .fields .set ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .set ("location",    new X3D .Fields .SFVec3f ());
      this .fields .set ("minRange",    new X3D .Fields .SFFloat (10));
      this .fields .set ("maxRange",    new X3D .Fields .SFFloat (10));
      this .fields .set ("loop",        new X3D .Fields .SFBool ());
      this .fields .set ("start",       new X3D .Fields .SFTime ());
      this .fields .set ("pause",       new X3D .Fields .SFTime ());
   }
};

;// ./src/nodes/Rotation.js


class Rotation extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("rotation", new X3D .Fields .SFRotation ());
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      matrix = matrix .rotate (this .fields .get ("rotation"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};

;// ./src/nodes/Scale.js


class Scale extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("scaleFactor", new X3D .Fields .SFVec3f (1, 1, 1));
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      matrix = matrix .scale (this .fields .get ("scaleFactor"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};

;// ./src/nodes/Separator.js


class Separator_Separator extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const transformNode = converter .scene .createNode ("Transform");

      // Add root node if needed or add as child.

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (transformNode);
      else
         converter .scene .rootNodes .push (transformNode);

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, transformNode);

      // Convert children.

      converter .save ();
      converter .transforms .push (transformNode);
      converter .groups     .push (transformNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};

;// ./src/nodes/ShapeHints.js


class ShapeHints extends BaseNode
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

;// ./src/nodes/Sphere.js


class Sphere extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("radius", new X3D .Fields .SFFloat (1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const
         shapeNode      = converter .scene .createNode ("Shape"),
         appearanceNode = converter .scene .createNode ("Appearance"),
         geometryNode   = converter .scene .createNode ("Sphere");

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

      geometryNode .radius = this .fields .get ("radius");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (shapeNode);
      else
         converter .scene .rootNodes .push (shapeNode);
   }
};

;// ./src/nodes/SpotLight.js


class SpotLight extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("on",          new X3D .Fields .SFBool (true));
      this .fields .set ("intensity",   new X3D .Fields .SFFloat (1));
      this .fields .set ("color",       new X3D .Fields .SFColor (1, 1, 1));
      this .fields .set ("location",    new X3D .Fields .SFVec3f (0, 0, 1));
      this .fields .set ("direction",   new X3D .Fields .SFVec3f (0, 0, -1));
      this .fields .set ("dropOffRate", new X3D .Fields .SFFloat ());
      this .fields .set ("cutOffAngle", new X3D .Fields .SFFloat (0.785398));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const lightNode = converter .scene .createNode ("SpotLight");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, lightNode);

      // Assign values.

      lightNode .on          = this .fields .get ("on");
      lightNode .intensity   = this .fields .get ("intensity");
      lightNode .color       = this .fields .get ("color");
      lightNode .location    = this .fields .get ("location");
      lightNode .direction   = this .fields .get ("direction");
      lightNode .cutOffAngle = this .fields .get ("cutOffAngle");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (lightNode);
      else
         converter .scene .rootNodes .push (lightNode);
   }
};

;// ./src/nodes/Switch.js


class Switch extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("whichChild", new X3D .Fields .SFInt32 (-1));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform"),
         switchNode    = converter .scene .createNode ("Switch");

      // Set values.

      transformNode .children .push (switchNode);

      switchNode .whichChoice = this .fields .get ("whichChild");

      // Add root node if needed or add as child.

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (transformNode);
      else
         converter .scene .rootNodes .push (transformNode);

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, transformNode);

      // Convert children.

      converter .save ();
      converter .transforms .push (transformNode);
      converter .groups     .push (switchNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};

;// ./src/nodes/Text.js


class Text extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("string",        new X3D .Fields .MFString (""));
      this .fields .set ("direction",     new X3D .Fields .SFString ("LR"));
      this .fields .set ("justification", new X3D .Fields .SFString ("BEGIN"));
      this .fields .set ("spacing",       new X3D .Fields .SFFloat (1));
      this .fields .set ("width",         new X3D .Fields .MFFloat (0));
   }
};

;// ./src/nodes/TextLanguage.js


class TextLanguage extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("textLanguage", new X3D .Fields .SFString ());
   }
};

;// ./src/nodes/Texture2.js


class Texture2 extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("filename", new X3D .Fields .SFString ());
      this .fields .set ("image",    new X3D .Fields .SFImage ());
      this .fields .set ("wrapS",    new X3D .Fields .SFString ("REPEAT"));
      this .fields .set ("wrapT",    new X3D .Fields .SFString ("REPEAT"));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .textures .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      if (this .fields .get ("filename") .length)
      {
         // Create nodes.

         const textureNode = converter .scene .createNode ("ImageTexture");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, textureNode);

         // Assign values.

         textureNode .url     = [ this .fields .get ("filename") .getValue () ];
         textureNode .repeatS = this .fields .get ("wrapS") .getValue () !== "CLAMP";
         textureNode .repeatT = this .fields .get ("wrapT") .getValue () !== "CLAMP";

         converter .textures .push (textureNode);
      }
      else
      {
         // Create nodes.

         const textureNode = converter .scene .createNode ("PixelTexture");

         // Set name.

         if (this .name)
            converter .scene .updateNamedNode (this .name, textureNode);

         // Assign values.

         textureNode .image   = this .fields .get ("image");
         textureNode .repeatS = this .fields .get ("wrapS") .getValue () !== "CLAMP";
         textureNode .repeatT = this .fields .get ("wrapT") .getValue () !== "CLAMP";

         converter .textures .push (textureNode);
      }
   }
};

;// ./src/nodes/Texture2Transform.js


class Texture2Transform extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation", new X3D .Fields .SFVec2f ());
      this .fields .set ("rotation",    new X3D .Fields .SFFloat ());
      this .fields .set ("scaleFactor", new X3D .Fields .SFVec2f (1, 1));
      this .fields .set ("center",      new X3D .Fields .SFVec2f ());
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .textureTransforms .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const textureTransformNode = converter .scene .createNode ("TextureTransform");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, textureTransformNode);

      // Assign values.

      textureTransformNode .translation = this .fields .get ("translation");
      textureTransformNode .rotation    = this .fields .get ("rotation");
      textureTransformNode .scale       = this .fields .get ("scaleFactor");
      textureTransformNode .center      = this .fields .get ("center");

      converter .textureTransforms .push (textureTransformNode);
   }
};

;// ./src/nodes/TextureCoordinate2.js


class TextureCoordinate2 extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("point", new X3D .Fields .MFVec2f (new X3D .Fields .SFVec2f ()));
   }

   use (converter)
   {
      try
      {
         if (!this .name)
            return false;

         converter .texCoords .push (converter .scene .getNamedNode (this .name));

         return true;
      }
      catch
      {
         return false;
      }
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const texCoordNode = converter .scene .createNode ("TextureCoordinate");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, texCoordNode);

      // Assign values.

      texCoordNode .point = this .fields .get ("point");

      converter .texCoords .push (texCoordNode);
   }
};

;// ./src/nodes/Transform.js


class Transform extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation",      new X3D .Fields .SFVec3f ());
      this .fields .set ("rotation",         new X3D .Fields .SFRotation ());
      this .fields .set ("scaleFactor",      new X3D .Fields .SFVec3f (1, 1, 1));
      this .fields .set ("scaleOrientation", new X3D .Fields .SFRotation ());
      this .fields .set ("center",           new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      let m = new X3D .Fields .SFMatrix4f ();

      m .setTransform (this .fields .get ("translation"),
                       this .fields .get ("rotation"),
                       this .fields .get ("scaleFactor"),
                       this .fields .get ("scaleOrientation"),
                       this .fields .get ("center"));

      matrix = matrix .multLeft (m);

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};

;// ./src/nodes/Translation.js


class Translation extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("translation", new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      const transform = converter .transforms .at (-1);

      if (!transform)
         return;

      const { X3D } = this;

      let matrix = new X3D .Fields .SFMatrix4f ();

      matrix .setTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);

      matrix = matrix .translate (this .fields .get ("translation"));

      matrix .getTransform (transform .translation,
                            transform .rotation,
                            transform .scale,
                            transform .scaleOrientation,
                            transform .center);
   }
};

;// ./src/nodes/WWWAnchor.js


class WWWAnchor extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",        new X3D .Fields .MFString ());
      this .fields .set ("description", new X3D .Fields .SFString (""));
      this .fields .set ("map",         new X3D .Fields .SFString ("NONE"));
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create Transform node.

      const
         transformNode = converter .scene .createNode ("Transform"),
         anchorNode    = converter .scene .createNode ("Anchor");

      // Set values.

      transformNode .children .push (anchorNode);

      anchorNode .url         = this .fields .get ("name");
      anchorNode .description = this .fields .get ("description");

      // Add root node if needed or add as child.

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (transformNode);
      else
         converter .scene .rootNodes .push (transformNode);

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, transformNode);

      // Convert children.

      converter .save ();
      converter .transforms .push (transformNode);
      converter .groups     .push (anchorNode);

      for (const node of this .fields .get ("children"))
         node .convert (converter);

      converter .restore ();
   }
};

;// ./src/nodes/WWWInline.js


class WWWInline extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("name",       new X3D .Fields .MFString ());
      this .fields .set ("bboxSize",   new X3D .Fields .SFVec3f (-1, -1, -1));
      this .fields .set ("bboxCenter", new X3D .Fields .SFVec3f ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const inlineNode = converter .scene .createNode ("Inline");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, inlineNode);

      // Assign values.

      inlineNode .url = this .fields .get ("name");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (inlineNode);
      else
         converter .scene .rootNodes .push (inlineNode);
   }
};

;// ./src/nodes/WorldInfo.js


class WorldInfo extends BaseNode
{
   constructor (X3D, typeName, name)
   {
      super (X3D, typeName, name);

      this .fields .set ("title", new X3D .Fields .SFString ());
      this .fields .set ("info",  new X3D .Fields .MFString ());
   }

   convert (converter)
   {
      if (this .use (converter))
         return;

      // Create nodes.

      const infoNode = converter .scene .createNode ("WorldInfo");

      // Set name.

      if (this .name)
         converter .scene .updateNamedNode (this .name, infoNode);

      // Assign values.

      infoNode .title = this .fields .get ("title");
      infoNode .info  = this .fields .get ("info");

      if (converter .transforms .length)
         converter .groups .at (-1) .children .push (infoNode);
      else
         converter .scene .rootNodes .push (infoNode);
   }
};

;// ./src/Converter.js
class Converter
{
	transforms = [ ];
	groups = [ ];
	materials = [ ];
	textures = [ null ];
	textureTransforms = [ null ];
	texCoords = [ null ];
	normals = [ null ];
	coords = [ null ];

	shapeHints = [ ];
	materialBindings = [ ];
	normalBindings = [ ];

   // Private properties

	#transformsSize = [ ];
	#groupsSize = [ ];
	#materialsSize = [ ];
	#texturesSize = [ ];
	#textureTransformsSize = [ ];
	#texCoordsSize = [ ];
	#normalsSize = [ ];
	#coordsSize = [ ];

	#shapeHintsSize = [ ];
	#materialBindingsSize = [ ];
	#normalBindingsSize = [ ];

   constructor (scene)
   {
      this .scene = scene;

      this .materials .push (scene .createNode ("Material"));
   }

   save ()
   {
      this .#transformsSize        .push (this .transforms        .length);
      this .#groupsSize            .push (this .groups            .length);
      this .#materialsSize         .push (this .materials         .length);
      this .#texturesSize          .push (this .textures          .length);
      this .#textureTransformsSize .push (this .textureTransforms .length);
      this .#texCoordsSize         .push (this .texCoords         .length);
      this .#normalsSize           .push (this .normals           .length);
      this .#coordsSize            .push (this .coords            .length);
      this .#shapeHintsSize        .push (this .shapeHints        .length);
      this .#materialBindingsSize  .push (this .materialBindings  .length);
      this .#normalBindingsSize    .push (this .normalBindings    .length);
   }

   restore ()
   {
      this .transforms        .length = this .#transformsSize        .at (-1);
      this .groups            .length = this .#groupsSize            .at (-1);
      this .materials         .length = this .#materialsSize         .at (-1);
      this .textures          .length = this .#texturesSize          .at (-1);
      this .textureTransforms .length = this .#textureTransformsSize .at (-1);
      this .texCoords         .length = this .#texCoordsSize         .at (-1);
      this .normals           .length = this .#normalsSize           .at (-1);
      this .coords            .length = this .#coordsSize            .at (-1);
      this .shapeHints        .length = this .#shapeHintsSize        .at (-1);
      this .materialBindings  .length = this .#materialBindingsSize  .at (-1);
      this .normalBindings    .length = this .#normalBindingsSize    .at (-1);

      this .#transformsSize        .pop ();
      this .#groupsSize            .pop ();
      this .#materialsSize         .pop ();
      this .#texturesSize          .pop ();
      this .#textureTransformsSize .pop ();
      this .#texCoordsSize         .pop ();
      this .#normalsSize           .pop ();
      this .#coordsSize            .pop ();
      this .#shapeHintsSize        .pop ();
      this .#materialBindingsSize  .pop ();
      this .#normalBindingsSize    .pop ();
   }
};

;// ./src/x_ite-vrml1-parser.js


















































__webpack_exports__default (X3D =>
{
/*
*  Grammar
*/

// VRML lexical elements
const Grammar = X3D .Expressions ({
   // General
   Whitespaces: /[\x20\n,\t\r]+/y,
   Comment:     /#\/\*.*?\*\/#|#[^\r\n]*(?=[\r\n]|$)/sy,
   LineFeed:    /\n/g,

   // Keywords
   DEF:    /DEF/y,
   fields: /fields/y,
   NULL:   /NULL/y,
   USE:    /USE/y,

   // Terminal symbols
   OpenBrace:    /\{/y,
   CloseBrace:   /\}/y,
   OpenBracket:  /\[/y,
   CloseBracket: /\]/y,
   Period:       /\./y,
   Colon:        /:/y,
   VerticalBar:  /\|/y,

   // eslint-disable-next-line no-control-regex
   Id: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/y,
   // eslint-disable-next-line no-control-regex
   ComponentNameId: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]*/y,

   // Values
   int32: /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/y,
   double: /(?!0[xX])[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/y,
});

return class VRML1Parser extends X3D .X3DParser
{
   static {
      X3D .GoldenGate .addParsers (this);
   }

   static nodes = new Map ([
      ["AsciiText",          AsciiText],
      ["Background",         Background],
      ["CollideStyle",       CollideStyle],
      ["Cone",               Cone],
      ["Coordinate3",        Coordinate3],
      ["Cube",               Cube],
      ["Cylinder",           Cylinder],
      ["DirectedSound",      DirectedSound],
      ["DirectionalLight",   DirectionalLight],
      ["ElevationGrid",      ElevationGrid],
      ["Environment",        Environment],
      ["FontStyle",          FontStyle],
      ["GeneralCylinder",    GeneralCylinder],
      ["Group",              Separator],
      ["IndexedFaceSet",     IndexedFaceSet],
      ["IndexedLineSet",     IndexedLineSet],
      ["Info",               Info],
      ["LOD",                LOD],
      ["Material",           Material],
      ["MaterialBinding",    MaterialBinding],
      ["MatrixTransform",    MatrixTransform],
      ["NavigationInfo",     NavigationInfo],
      ["Normal",             Normal],
      ["NormalBinding",      NormalBinding],
      ["OrthographicCamera", OrthographicCamera],
      ["PerspectiveCamera",  PerspectiveCamera],
      ["PointLight",         PointLight],
      ["PointSet",           PointSet],
      ["PointSound",         PointSound],
      ["Rotation",           Rotation],
      ["Scale",              Scale],
      ["Separator",          Separator_Separator],
      ["ShapeHints",         ShapeHints],
      ["Sphere",             Sphere],
      ["SpotLight",          SpotLight],
      ["Switch",             Switch],
      ["Text",               Text],
      ["TextLanguage",       TextLanguage],
      ["Texture2",           Texture2],
      ["Texture2Transform",  Texture2Transform],
      ["TextureCoordinate2", TextureCoordinate2],
      ["Transform",          Transform],
      ["Translation",        Translation],
      ["WWWAnchor",          WWWAnchor],
      ["WWWInline",          WWWInline],
      ["WorldInfo",          WorldInfo],
   ]);

   static substitutions = new Map ([
      ["SFBitMask", "SFString"],
      ["SFEnum",    "SFString"],
      ["SFLong",    "SFInt32"],
      ["SFMatrix",  "SFMatrix4f"],
      ["MFBitMask", "MFString"],
      ["MFEnum",    "MFString"],
      ["MFLong",    "MFInt32"],
      ["MFMatrix",  "MFMatrix4f"],
   ]);

   getEncoding ()
   {
      return "STRING";
   }

   setInput (input)
   {
      this .input      = input;
      this .lineNumber = 0;
      this .lastIndex  = 0;
   }

   isValid ()
   {
      return this .input .match (/^#VRML V1.0/);
   }

   parseIntoScene (resolve, reject)
   {
      this .parser     = new X3D .VRMLParser (this .getScene ());
      this .namedNodes = new Map ();
      this .rootNodes  = [ ];

      this .parser [X3D .X3DConstants .SFNode]   = this [X3D .X3DConstants .SFNode];
      this .parser [X3D .X3DConstants .SFString] = this [X3D .X3DConstants .SFString];

      this .parser .pushExecutionContext (this .getScene ());
      this .parser .setInput (this .input);

      this .vrml1 ()
         .then (resolve)
         .catch (reject);
   }

   static components = [
      "EnvironmentalSensor",
      "PointingDeviceSensor",
      "Scripting",
      "Sound",
      "Text",
   ];

   async vrml1 ()
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      // Parse input.

      this .vrmlScene ();

      // Convert and create scene.

      scene .setEncoding ("VRML");
      scene .setProfile (browser .getProfile ("Interchange"));

      for (const componentName of VRML1Parser .components)
         scene .updateComponent (browser .getComponent (componentName));

      await this .loadComponents ();

		this .convert ();

      // // Optimize scene.

      // const optimizer = new X3D .X3DOptimizer ();

      // optimizer .removeEmptyGroups     = true;
      // optimizer .combineGroupingNodes  = true;
      // optimizer .optimizeInterpolators = true;

      // optimizer .optimizeSceneGraph (scene .rootNodes);

      // console .log (scene .toVRMLString ());

      return scene;
   }

   convert ()
   {
      const converter = new Converter (this .getScene ());

      for (const node of this .rootNodes)
         node .convert (converter);
   }

   vrmlScene ()
   {
      this .statements ();

      if (this .lastIndex < this .input .length)
         throw new Error ("Unknown statement.");
   }

   comments ()
   {
      while (this .comment ())
         ;
   }

   comment ()
   {
      if (this .whitespaces ())
         return true;

      return Grammar .Comment .parse (this);
   }

   whitespaces ()
   {
      if (Grammar .Whitespaces .parse (this))
      {
         this .lines (this .result [0]);

         return true;
      }

      return false;
   }

   lines (string)
   {
      const match = string .match (Grammar .LineFeed);

      if (match)
         this .lineNumber += match .length;
   }

   statements ()
   {
      while (this .statement ())
		   ;
   }

   statement ()
   {
      const node = this .nodeStatement ();

      if (node)
      {
         this .rootNodes .push (node);
         return true;
      }

      return false;
   }

   nodeStatement ()
   {
      this .comments ();

      if (Grammar .DEF .parse (this))
      {
         if (this .Id ())
            return this .node (this .result [0]);

         throw new Error ("No name given after DEF.");
      }

      if (Grammar .USE .parse (this))
      {
         if (this .Id ())
         {
            const nodeNameId = this .result [0];

            return this .namedNodes .get (nodeNameId);
         }

         throw new Error ("No name given after USE.");
      }

      if (Grammar .NULL .parse (this))
         return null;

      return this .node ("");
   }

   node (nodeNameId)
   {
      const { lastIndex, lineNumber } = this;

      if (this .Id ())
      {
         const nodeTypeId = this .result [0];

         this .comments ();

         if (Grammar .OpenBrace .parse (this))
         {
            // console .log (nodeTypeId);

            const
               nodeType = VRML1Parser .nodes .get (nodeTypeId) ?? CustomNode,
               node     = new nodeType (X3D, nodeTypeId, nodeNameId);

            if (nodeNameId)
               this .namedNodes .set (nodeNameId, node);

            if (nodeType === CustomNode)
               this .fieldElements (node);

            this .nodeBody (node);

            this .comments ();

            if (Grammar .CloseBrace .parse (this))
               return node;

			   throw new Error ("Expected '}' at the end of node body.");
         }

         this .lastIndex  = lastIndex;
         this .lineNumber = lineNumber;

         return false;
      }

      return false;
   }

   nodeBody (node)
   {
      while (this .nodeBodyElement (node))
		   ;
   }

   nodeBodyElement (node)
   {
      const child = this .nodeStatement ();

      if (child)
      {
         node .fields .get ("children") .push (child);
         return true;
      }

      if (this .Id ())
      {
         const
            fieldId = this .result [0],
            field   = node .fields .get (fieldId);

         if (!field)
            throw new Error (`Unknown field '${fieldId}' in class '${node .typeName}'.`);

         if (field .isInitializable ())
         {
            if (this .fieldValue (field))
               return true;

            throw new Error (`Couldn't read value for field '${fieldId}' of node ${node .typeName}.`);
         }

         throw new Error (`Couldn't assign value to field '${fieldId}'.`);
      }

      return false;
   }

   fieldElements (node)
   {
      this .comments ();

      if (Grammar .fields .parse (this))
      {
         this .comments ();

         if (Grammar .OpenBracket .parse (this))
         {
            while (this .fieldElement (node))
               ;

            if (Grammar .CloseBracket .parse (this))
               return;
         }

         throw new Error ("Couldn't parse custom fields.");
      }
   }

   fieldElement (node)
   {
	   this .comments ();

      if (this .Id ())
      {
         const fieldType = VRML1Parser .substitutions .get (this .result [0])
            ?? this .result [0];

         this .comments ();

         if (this .Id ())
         {
            const
               fieldName = this .result [0],
               field     = new (this .getBrowser () .getFieldType (fieldType)) ();

            node .fields .set (fieldName, field);

            return true;
         }
      }

      return false;
   }

   fieldValue (field)
   {
      this .parser .lineNumber = this .lineNumber;
      this .parser .lastIndex  = this .lastIndex;

      const result = this .parser [field .getType ()] (field, field .getUnit ());

      this .lineNumber = this .parser .lineNumber;
      this .lastIndex  = this .parser .lastIndex;

      return result;
   }

   Id ()
   {
      this .comments ();

      return Grammar .Id .parse (this);
   }

   [X3D .X3DConstants .SFNode] ()
   {
      return false;
   }

   [X3D .X3DConstants .SFString] (field)
   {
      if (X3D .VRMLParser .prototype .sfstringValue .call (this, field))
         return true;

      // Parse SFEnum and SFBitMask

      field .setValue ("");

      this .comments ();

      while (this .Id ())
      {
         field .setValue (field .getValue () + this .result [0]);

         this .comments ();

         if (Grammar .VerticalBar .parse (this))
         {
            field .setValue (field .getValue () + "|");

            this .comments ();
            continue;
         }

         return true;
      }

      return false;
   }
};
});

/******/ })()
;