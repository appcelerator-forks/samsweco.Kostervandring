exports.definition = {
	config: {
		columns: {
		    "trailID": "integer",
		    "infoSpotID": "integer"
		},
		adapter: {
			type: "sql",
			collection_name: "infospot_trailsModel"
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