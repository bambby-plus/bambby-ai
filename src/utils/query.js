const db = require("../db/")
const { QueryTypes } = require("sequelize")

exports.selectAllCountries = async () => {
	const countryProfiles = await db.sequelize.query(
		"SELECT * FROM locale_country_profile",
		{
			type: QueryTypes.SELECT,
		}
	)

	if (countryProfiles.length <= 0) {
		return []
	}

	return countryProfiles
}