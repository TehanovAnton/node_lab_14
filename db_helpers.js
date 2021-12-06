const db_config = require('./db_config')
const sql = require('mssql')

let rows = callback => (err, result) => {
    _table = []

    if (err)
        console.log(err.originalError.info.message)
    else {
        for (let i = 0; i < result.rowsAffected[0]; i++) {                        
            let row = {}         
            for (key in result.recordset[i]) {
                row[key] = faculty = result.recordset[i][key]
            }

            _table.push(row)
        }
    }

    callback(_table)
}

let db_select = (sql_query, callback) => {
    sql.connect(db_config, err => {     
        faculties = {}

        if (err) {
            console.log(err.code)
        }        
        else {      
            new sql.Request().query(sql_query, rows(callback))
        }
    })
}

let db_insert_faculties = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('f', sql.Char(10))
            ps.input('fn', sql.NVarChar(50))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ f: params.faculty, fn: params.faculty_name }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_insert_pulpits = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('p', sql.Char(10))
            ps.input('pn', sql.VarChar(100))
            ps.input('f', sql.Char(10))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ p: params.pulpit, pn: params.pulpit_name, f: params.faculty }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_insert_subjects = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('s', sql.Char(10))
            ps.input('sn', sql.VarChar(50))
            ps.input('p', sql.Char(10))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ s: params.subject, sn: params.subject_name, p: params.pulpit }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_insert_auditotium_type = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('at', sql.Char(10))
            ps.input('atn', sql.VarChar(30))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ at: params.auditorium_type, atn: params.auditorium_typename }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_insert_auditotium = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('a', sql.Char(10))
            ps.input('an', sql.VarChar(200))
            ps.input('ac', sql.Int)
            ps.input('at', sql.Char(10))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ a: params.auditorium, an: params.auditorium_name, ac: params.auditorium_capacity, at: params.auditorium_type }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_update_faculties = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('f', sql.VarChar(50))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {                    
                    ps.execute({ f: params.faculty_name }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_update_pulpits = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('p', sql.VarChar(100))            
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ p: params.pulpit_name }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_update_subjects = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('s', sql.VarChar(50))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ s: params.subject_name }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_update_auditotium_type = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('at', sql.VarChar(30))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ at: params.auditorium_typename }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}

let db_update_auditotium = (sql_query, params, clbck) => {
    sql.connect(db_config, err => {
        if (err) {
            console.log(err.code)
        } 
        else {
            const ps = new sql.PreparedStatement()
            ps.input('a', sql.VarChar(200))
            ps.prepare(sql_query, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    ps.execute({ a: params.auditorium_name }, (err, result) => { clbck(err, result) } )
                }
            })
        }
    })
}


module.exports = { db_select,
    db_insert_faculties, db_insert_pulpits, db_insert_subjects, db_insert_auditotium_type, db_insert_auditotium,
    db_update_faculties, db_update_pulpits, db_update_subjects, db_update_auditotium_type, db_update_auditotium
}