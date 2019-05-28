insert into alumno (tx_nombre,tx_primer_ape,tx_segundo_ape,tx_curp, fh_nacimiento, tx_boleta) values ('Homero', 'j', 'Simpson', 'homo1245dcupra9012', 1997, 2017017533)



insert into unidad_academica (tx_nombre,tx_acronimo) values ('Escuela Superior de Cómputo', 'ESCOM'), ('Escuela Superior de Comercio y Administración', 'ESCA'), ('Escuela Superior de Fisico Matemáticas', 'ESFM') 


insert into area_conocimiento(tx_nombre) values ('Fisico matemáticas'), ('Administrativas'), ('Sociales');

ALTER TABLE area_conocimiento
    ALTER COLUMN tx_nombre TYPE VARCHAR(500);

ALTER TABLE nivel_academico
    ALTER COLUMN tx_nombre TYPE VARCHAR(500);

insert into nivel_academico(tx_nombre) values ('Superior');


insert into programa_academico(id_area, id_nivel, tx_nombre) values (1,1, 'Ingenieria en sistemas computacionales'), (1,1, 'Ingenieria en comunicaciones y electrónica'), (1,1, 'Ingenieria en sistemas automotrices');

insert into unidad_academica_programa values (1,1);

update unidad_academica set tx_nombre = 'Escuela Superior de Ingeniería Mecánica y Eléctrica unidad zacatenco', tx_acronimo = 'ESIME ZACATENCO'  where id_unidad = 3;


insert into plan_estudio(id_programa, tx_nombre) values (1, 'plan 2009 sistemas'), (2, 'plan 2009 comunicaciones'), (3, 'plan 2015 automotrices');

insert into nivel (id_plan, nu_nivel) values (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10);

insert into tipo_materia (tx_nombre) values ('Formación institucional'), ('Formación científico básica'), ('Formación profesional'), ('Formación terminal e Integración')

insert into ciclo_escolar(fh_inicio,fh_fin) values ('2018-02-12','2018-06-22');


insert into periodo_escolar(id_ciclo,fh_inicio,fh_fin) values (1,'2018-02-12','2018-06-22');

insert into reinscripcion values (1,1,1,1,7,1);

insert into curse (id_alumno, id_unidad, id_programa, id_plan, id_nivel, id_periodo, id_materia) values (1,1,1,1,4,1,1);

insert into calificacion(tx_nombre, nu_calificacion) values (9, 9);


insert into inscripcion  values (1,5,1,1);


select  a.tx_nombre, a.tx_boleta from alumno a, 
inscripcion i where i.id_unidad = 1 and 
a.id_alumno = i.id_alumno;



insert into periodo_escolar(id_ciclo, fh_inicio, fh_fin) values (2,'2017-07-23', '2017-12-07');


insert into reinscripcion values (1,1,1,1,4,2);

insert into curse (id_alumno, id_unidad, id_programa, id_plan, id_nivel, id_periodo, id_materia) values (1,1,1,1,4,2,1);
insert into materia (id_nivel, id_tipo, tx_nombre, nu_credito) values(31,1,'sistemas de audio', 4.5);

insert into curse (id_alumno, id_unidad, id_programa, id_plan, id_nivel, id_periodo, id_materia) values(1,5,4,4,31,2,5);

insert into calificacion_curse (id_curse, id_calificacion) values (5,2);