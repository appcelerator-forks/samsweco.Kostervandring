exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "name": "text",
		    "x-koord": "real",
		    "y-koord": "real",
		    "icon": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "infospotModel"
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