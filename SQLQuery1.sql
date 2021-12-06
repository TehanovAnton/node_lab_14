use node_lab14

delete from FACULTY where FACULTY = 'new_f'
delete from PULPIT where PULPIT= 'new_f'


select * from PULPIT
insert into FACULTY(FACULTY, FACULTY_NAME) values('new_f','new_f')
insert into PULPIT(PULPIT, PULPIT_NAME, FACULTY) values('new_f', 'new_f', 'ТОВ')
insert into AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values(@s, @sn, @p)

update PULPIT set PULPIT = 'new_P', PULPIT_NAME = 'что то не так', FACULTY = 'new_f' where PULPIT = 'new_p'

