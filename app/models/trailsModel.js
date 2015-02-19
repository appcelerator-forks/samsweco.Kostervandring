exports.definition = {
	config: {
		columns: {
		    "id": "integer",
		    "name": "text",
		    "length": "text",
		    "infoTxt": "text",
		    "color": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "trailsModel"
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