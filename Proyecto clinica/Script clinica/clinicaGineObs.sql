drop database clinicaGineObs;
create database clinicaGineObs;
use clinicaGineObs;
create table tblUsuario(
	idUsuario int primary key,
    nombreUsuario varchar(50) not null,
    contrasenia varchar(255) not null,
    tipoUsuario varchar(50),
    Estado varchar(50)
)engine=InnoDB default charset=utf8;
insert into tblUsuarios values(1,'JuanPirir','123','activo');
create table tblServicio(
	idServicio int primary key,
    nombreServicio varchar(100),
    descripcionServicio varchar(100),
    costo decimal(10,2)
)engine=InnoDB default charset=utf8;
insert into tblServicio values(1,'Consulta','Consulta',350);

create table tblFormaPago(
	idFormaPago int primary key,
    nombreFormaPago varchar(50),
    descripcionFormaPago varchar(100)
)engine=InnoDB default charset=utf8;
insert into tblFormaPago values(1,'Efectivo','Pago en efectivo');
create table tblClinica (
    idClinica INT AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT,
    idServicio int,
    nombreClinica VARCHAR(100),
    direccionClinica VARCHAR(150),
    telefonoClinica VARCHAR(15),
    correoClinica VARCHAR(100),
    horarioClinica time,
    foreign key (idUsuario) references tblUsuario(idUsuario),
    foreign key (idServicio) references tblServicio(idServicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into tblClinica values(1,'1','1','Clinica de ginecología y obstetricia','zona 1','123','clinica@gmail.com','7:30');
create table tblPaciente(
	idPaciente int primary key,
    nombrePaciente varchar(50),
    apellidoPaciente varchar(50),
    fechaNacimientoPaciente date,
    generoPaciente varchar(10),
    direccionPaciente varchar(100),
    telefonoPaciente varchar(15),
    correoPaciente varchar(100)
)engine=InnoDB default charset=utf8;
insert into tblPaciente values(1,'Juana','Pirir','2000-12-31','Femenino','zona 1','12345678','clinica@gmail.com');
select * from tblPaciente;
create table tblCitaSolicitada(
	idCitaSolicitada int primary key,
    idPaciente int,
    idServicio int,
    fechaHoraCitaSolicitada datetime,
    servicioSolicitado varchar(100),
    foreign key (idPaciente) references tblPaciente(idPaciente),
    foreign key (idServicio) references tblServicio(idServicio)
)engine=InnoDB default charset=utf8;
insert into tblCitaSolicitada values(1,'1','1','2023-01-01 07:30:00','Consulta');

create table tblCitaConfirmada(
	idCitaConfirmada int primary key,
    idCitaSolicitada int,
    idFormaPago int,
    fechaHoraCita datetime,
    estadoCita varchar(20),
    foreign key (idCitaSolicitada) references tblCitaSolicitada(idCitaSolicitada),
    foreign key (idFormaPago) references tblFormaPago(idFormaPago)
)engine=InnoDB DEFAULT CHARSET=utf8;
insert into tblCitaConfirmada values(1,'1','1','2023-01-01 07:30:00','Activo');

