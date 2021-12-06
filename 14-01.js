const http = require('http')
const url = require('url')
const sql = require('mssql')

const config = require('./db_config')
const db_select = require('./db_helpers').db_select

const db_insert_faculties = require('./db_helpers').db_insert_faculties
const db_insert_pulpits = require('./db_helpers').db_insert_pulpits
const db_insert_subjects = require('./db_helpers').db_insert_subjects
const db_insert_auditotium_type = require('./db_helpers').db_insert_auditotium_type
const db_insert_auditotium = require('./db_helpers').db_insert_auditotium

const db_update_faculties = require('./db_helpers').db_update_faculties
const db_update_pulpits = require('./db_helpers').db_update_pulpits
const db_update_subjects = require('./db_helpers').db_update_subjects
const db_update_auditotium_type = require('./db_helpers').db_update_auditotium_type
const db_update_auditotium = require('./db_helpers').db_update_auditotium

const db_delete_faculties = require('./db_helpers').db_delete_faculties
const db_delete_pulpits = require('./db_helpers').db_delete_pulpits
const db_delete_subjects = require('./db_helpers').db_delete_subjects
const db_delete_auditotium_type = require('./db_helpers').db_delete_auditotium_type
const db_delete_auditotium = require('./db_helpers').db_delete_auditotium

const collect_data = require('./http_helpers').collectData

const PORT = 3000

http.createServer((req, res) => {
    let parsed_url = url.parse(req.url)
    let pathname = parsed_url.pathname
// GET
    if (req.method == 'GET') {
        if (pathname == '/api/faculties') {
            db_select('use node_lab14; select * from FACULTY', rows => {
                arr = []
                rows.forEach(row => {
                    arr.push(row.FACULTY_NAME)
                });
    
                res.end(JSON.stringify(arr))
            })        
        }
        else if (pathname == '/api/pulpits') {
            db_select('use node_lab14; select * from PULPIT', rows => {
                arr = []
                rows.forEach(row => {
                    arr.push(row.PULPIT_NAME)
                });
    
                res.end(JSON.stringify(arr))
            })
        }
        else if (pathname == '/api/subjects') {
            db_select('use node_lab14; select * from SUBJECT', rows => {
                arr = []
                rows.forEach(row => {
                    arr.push(row.SUBJECT_NAME)
                });
    
                res.end(JSON.stringify(arr))
            })
        }
        else if (pathname == '/api/auditoriumstypes') {        
            db_select('use node_lab14; select * from AUDITORIUM_TYPE', rows => {
                arr = []
                rows.forEach(row => {
                    arr.push(row.AUDITORIUM_TYPENAME)
                });
    
                res.end(JSON.stringify(arr))
            })
        }
        else if (pathname == '/api/auditoriums') {        
            db_select('use node_lab14; select * from AUDITORIUM', rows => {
                arr = []
                rows.forEach(row => {
                    arr.push(row.AUDITORIUM_NAME)
                });
    
                res.end(JSON.stringify(arr))
            })
        }
    } 
// POST
    else if (req.method == 'POST') {
        if (pathname == '/api/faculties') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_insert_faculties('use node_lab14; insert into FACULTY (FACULTY, FACULTY_NAME) values(@f, @fn)', data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/pulpits') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_insert_pulpits('use node_lab14; insert into PULPIT(PULPIT, PULPIT_NAME, FACULTY) values(@p, @pn, @f)', data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/subjects') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_insert_subjects('use node_lab14; insert into SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values(@s, @sn, @p)', data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/auditoriumstypes') {        
            collect_data(req, data => {
                data = JSON.parse(data)
                db_insert_auditotium_type('use node_lab14; insert into AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@at, @atn)', data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/auditoriums') {        
            collect_data(req, data => {
                data = JSON.parse(data)
                db_insert_auditotium('use node_lab14; insert into AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) values(@a, @an, @ac, @at)', data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
    }
// PUT
    else if (req.method == 'PUT') {
        if (pathname == '/api/faculties') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_update_faculties("use node_lab14; update FACULTY set FACULTY_NAME = @f where FACULTY = 'new_f'", data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row updated!')
                    }
                })                
            })
        }
        else if (pathname == '/api/pulpits') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_update_pulpits("use node_lab14; update PULPIT set PULPIT_NAME = @p where PULPIT = 'new_p'", data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/subjects') {
            collect_data(req, data => {
                data = JSON.parse(data)
                db_update_subjects("use node_lab14; update SUBJECT set SUBJECT_NAME = @s where SUBJECT = 'new_s'", data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/auditoriumstypes') {        
            collect_data(req, data => {
                data = JSON.parse(data)
                db_update_auditotium_type("use node_lab14; update AUDITORIUM_TYPE set AUDITORIUM_TYPENAME = @at where AUDITORIUM_TYPE = 'new_at'", data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
        else if (pathname == '/api/auditoriums') {        
            collect_data(req, data => {
                data = JSON.parse(data)
                db_update_auditotium("use node_lab14; update AUDITORIUM set AUDITORIUM_NAME = @a where AUDITORIUM = 'new_a'", data, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        res.end('row added!')
                    }
                })                
            })
        }
    }
// DELETE
    else if (req.method == 'DELETE') { 
        let code = pathname => pathname.split('/').reverse()[0]

        if (pathname.startsWith('/api/faculties')) {
            data = { faculty: code(pathname) }
            db_delete_faculties("use node_lab14; delete from FACULTY where FACULTY = @f", data, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.end('row deleted!')
                }
            })
        }
        else if (pathname.startsWith('/api/pulpits')) {
            data = { pulpit: code(pathname) }
            db_delete_pulpits("use node_lab14; delete from PULPIT where PULPIT = @p", data, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.end('row deleted!')
                }
            })
        }
        else if (pathname.startsWith('/api/subjects')) {
            data = { subject: code(pathname) }
            db_delete_subjects("use node_lab14; delete from SUBJECT where SUBJECT = @s", data, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.end('row deleted!')
                }
            })
        }
        else if (pathname.startsWith('/api/auditoriumstypes')) {        
            data = { auditorium_type: code(pathname) }
            db_delete_auditotium_type("use node_lab14; delete from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @at", data, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.end('row deleted!')
                }
            })
        }
        else if (pathname.startsWith('/api/auditoriums')) {                   
            data = { auditorium: code(pathname) }
            db_delete_auditotium("use node_lab14; delete from AUDITORIUM where AUDITORIUM = @a", data, (err, result) => {
                if (err)
                    console.log(err)
                else {
                    res.end('row deleted!')
                }
            })
        }        
    }
    else {
        res.end('routing error')
    }
}).listen(PORT, () => { console.log('server running'); })