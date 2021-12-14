use master
go

-- create db if not exists
if db_id('FruitStore') is null
  create database FruitStore
go

-- switch to db
use FruitStore

-- create tables

if not exists (select * from sysobjects where name='Fruits' and xtype='U')
  create table Fruits (
    FruitId bigint primary key identity,
    FruitName varchar(50) not null,
    Quantity int not null,
    Unit varchar(20) not null check( Unit in ('Box', 'KG', 'Pieces') ),
    Price decimal(10,2) not null
  )
go

-- sample data insertion

-- courses
SET IDENTITY_INSERT Fruits ON

insert into Fruits (FruitId, FruitName, Quantity, Unit, Price) values
    (1001, 'Grapes', 100, 'Box', 7.00),
    (3002, 'Banana', 20, 'Box', 11.99),
    (3009, 'Orange', 200, 'KG', 6.99),
    (3400, 'Watermelon', 100, 'Pieces', 4.99),
    (4987, 'Banana', 40, 'KG', 1.79)

SET IDENTITY_INSERT Fruits OFF
