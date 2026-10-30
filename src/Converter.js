export default class Converter
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
