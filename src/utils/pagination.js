exports.getPagination = (page, size) => {
 const limit = size ? parseInt(size) : 10

 const offset = page ?  limit * (parseInt(page) - 1) : 0

 return { limit, offset }
}

exports.getPagingData = (data, page, limit) => {
 const {count: totalItems, rows: data_res } = data
 const currentPage = page ? parseInt(page) : 1
 const totalPages = Math.ceil(totalItems / limit)

 return {
  totalItems,
  data: data_res,
  totalPages,
  currentPage
 }
}

exports.hasDuplicatePatternParams = (array) => {
 let dup_pattern = array

 for (let pat_params of array) {
   const pattern_exists = dup_pattern.filter(
     (val) =>
       val.name.toLowerCase() == pat_params.name.toLowerCase() ||
       val.slug.toLowerCase() == pat_params.slug.toLowerCase()
   )

   if (pattern_exists.length >= 2) {
     return true
   }
 }
 return false
}