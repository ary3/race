import Airtable from "airtable";
import { upsertApplications } from "../applications";

// get all records from airtable
export function getAirtableApplicationRecords() {
  return new Promise((r, reject) => {
    const base = Airtable.base(process.env.AIRTABLE_BASE);
    let results = [];
    base("Grid view")
      .select({
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const data = records.map((record) => record.fields);
          results = [...results, ...data];
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          } else {
            r(results);
          }
        }
      );
  });
}

// format airtable records into a format that can be inserted into MongoDB
export function formatAirtableRecords(records) {
  return records.map((record) => {
    // map fields from airtable to mongoDB
    const {
      "Ethereum Address": ethAddress,
      "Project Name": projectName,
      Attachments: description,
      "Project Goals": projectGoal,
      "Leader Statement": leaderStatement,
      "Project URL": projectUrl,
      "Additional Details": additionalDetails,
      Referral: referrals,
      "Helpful links": helpfulLink,
      "Please state evidence of exceptional ability for each founder":
        evidenceOfExceptionalAbility,
      "Provide some background on each founder": founderBackground,
      "Pitch us your product": pitch,
    } = record;
    return {
      ethAddress,
      projectName,
      description,
      projectGoal,
      leaderStatement,
      projectUrl,
      additionalDetails,
      referrals,
      helpfulLink,
      evidenceOfExceptionalAbility,
      founderBackground,
      pitch,
    };
  });
}

// sync the MongoDB with the AirTable form
export async function syncAirtableData() {
  const records = await getAirtableApplicationRecords();
  const transformedRecords = formatAirtableRecords(records);
  const updates = await upsertApplications(transformedRecords);
  return updates;
}