'use strict'
const db = use('Database')

class AnalysisController {
  async doingTagAverage({ request, response, auth }) {
    var user = await auth.current.user
    var doing = await db.raw(`
    select dt.tag, avg(d.feeling) as feeling from diaries d
    join diary_doing_tag ddt on ddt.diary_id = d.id and ddt.user_id = ${user.id}
    join doing_tags dt on dt.id = ddt.doing_tag_id
    where d.user_id = ${user.id}
    group by dt.tag
    `)
    return response.json(doing)
  }

  async peopleTagAverage({
    request,
    response,
    auth
  }) {
    var user = await auth.current.user
    var people = await db.raw(`
    select pt.tag, avg(d.feeling) as feeling from diaries d
    join diary_people_tag dpt on dpt.diary_id = d.id and dpt.user_id = ${user.id}
    join people_tags pt on pt.id = dpt.people_tag_id
    where d.user_id = ${user.id}
    group by pt.tag
    `)
    return response.json(people)
  }
}

module.exports = AnalysisController
