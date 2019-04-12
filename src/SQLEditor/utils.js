/* This file contains utils for the SQL Query editor component */
const SQL_TABLE_REF = `"$TABLE_REF"`
const TABLE_REF_NOTE = `For table names, you can use "$TABLE_REF" to reference the table filter value of the report or type your own table name`

export const SQL_DATE_TEMPLATE = `SELECT
cast(MIN("ORDER_DATE") as string) as START_DATE,
cast(MAX("ORDER_DATE") as string) as END_DATE,
cast(MIN("ORDER_DATE") as string) as DEFAULT_START_DATE,
cast(MAX("ORDER_DATE") as string) as DEFAULT_END_DATE
FROM ${SQL_TABLE_REF}`

export const SQL_QUERY_TEMPLATE = `SELECT DISTINCT
"VALUE_FIELD" AS VALUE,
"ALIAS_FIELD" AS ALIAS_VALUE
FROM ${SQL_TABLE_REF}
WHERE VALUE IS NOT NULL
ORDER BY 2
LIMIT 200`

export const SQL_DATE_TOOLTIP = `Mandatory Columns: START_DATE, END_DATE
Optional Columns: DEFAULT_START_DATE, DEFAULT_END_DATE

${TABLE_REF_NOTE}

It is required to cast all the dates to String like cast(MIN("dateField") as string)
`
export const SQL_QUERY_TOOLTIP = `Mandatory Column: VALUE
Optional Column: ALIAS_VALUE

${TABLE_REF_NOTE}

It is recommended to always add a DISTINCT and ORDER BY clause. Also, currently we only process a maximum of top 200 rows returned by the query.
`
