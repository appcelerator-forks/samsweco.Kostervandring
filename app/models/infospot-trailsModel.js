exports.definition = {
	config: {
		columns: {
		    "trailID": "int",
		    "infoSpotID": "int"
		},
		adapter: {
			type: "sql",
			collection_name: "infospot-trailsModel"
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