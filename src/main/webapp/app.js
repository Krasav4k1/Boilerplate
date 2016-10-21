/**
 * Angular application entry point
 * Defines ERP module and add configuration for parsing all jsog
 *
 * @author Dmitry Sheremet
 */
var app = angular
    .module('APP', ['ui.router', 'angularMoment'])
    .config(function () {

    }).constant("formats", {
        date: "YYYY-MM-DD"
    });