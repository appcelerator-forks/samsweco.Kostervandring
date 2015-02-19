exports.definition = {
	config: {
		columns: {
		    "id": "integer",
		    "name": "text",
		    "trailID": "integer",
		    "hotspotID": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "imageModel"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};