const { createResponse } = require("../../helpers/responseHelper");
const query = require("../../utils/query");
const { REDIS_GAMES_COUNTRIES_KEY } = require("../../config/")
const { setCache, setHashCache, getHashCache, getCache, deleteKey, getHashKeys } = require("../../db/redis");

const selectCountryProfiles = async () => {
  let country_profiles = [];
  // redis check
  
  let redis_data_countries = await getCache(REDIS_GAMES_COUNTRIES_KEY);

  if (redis_data_countries != null) {
    country_profiles = JSON.parse(redis_data_countries);
  } else {
    country_profiles = await query.selectAllCountries();
    setCache(REDIS_GAMES_COUNTRIES_KEY, JSON.stringify(country_profiles));
  }

  // deleteKey(REDIS_GAMES_COUNTRIES_KEY)
  // setCache(REDIS_GAMES_COUNTRIES_KEY, JSON.stringify(country_profiles));

  country_profiles = await query.selectAllCountries();

  let tld_codes = [];
  let parsed_country_profile = [];
  if (country_profiles.length <= 0) {
    tld_codes = ["gh", "zm", "cd", "ng", "global"];
  } else {
    // parse the  country_profiles
    // parsed_country_profile = JSON.stringify(country_profiles);
    parsed_country_profile = country_profiles;
    let all_tld_codes = parsed_country_profile.map((val) => val.tld_code.toLowerCase());
    // console.log(parsed_country_profile)
    tld_codes = all_tld_codes;
  }


  return { tld_codes, parsed_country_profile };
};

const checkLocale = async (req, res, next) => {
  if (!req.params.country) {
    return createResponse(res, 400, false, "You need to use the appropriate endpoint for your country");
  }

  //TODO: fetch all the country profiles available
  // const country_tld_codes = await selectCountryProfiles()
  let { tld_codes, parsed_country_profile } = await selectCountryProfiles();

  // console.log(tld_codes, "tld_codes")
  // console.log(parsed_country_profile, "parsed_country_profile")

  let avail_countries = tld_codes;
  let avail_version = ["v1"];

  //check if the locale is in available
  if (avail_countries.includes(req.params.country.toLowerCase()) && avail_version.includes(req.params.version.toLowerCase())) {
    req.country = req.params.country;
    req.version = req.params.version;


    if (parsed_country_profile?.length > 0) {
      req.country_profile_id = parsed_country_profile.filter(con=>con.tld_code == req.params.country)[0].country_profile_id
      req.utc_off_set = parsed_country_profile.filter(con=>con.tld_code == req.params.country)[0].utc_off_set
    }

    // console.log(req.country, "req.country")
    // console.log(req.version, "req.version")
    // console.log(req.country_profile_id, "req.country_profile_id")

    next();
  } else {
    return createResponse(res, 404, false, "Invalid endpoint");
  }
};

module.exports = checkLocale;
