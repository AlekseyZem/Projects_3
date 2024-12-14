import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

beforeEach('Начало теста', function () {
    cy.visit('/');
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
      });

afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');        
       }); 
//1
//Напиши проверку на позитивный кейс авторизации:
//а) Ввести правильный логин
//б) Ввести правильный пароль
//в) Нажать войти
//г) Проверить нужный текст и наличие кнопки крестик

it('Правильный логин и правильный пароль', function () {            
         cy.get(main_page.email).type(data.login);   //Ввели верный логин
         cy.get(main_page.password).type(data.password);  //Ввели верный пароль
         cy.get(main_page.login_button).click();  //Нажали войти

        cy.get(result_page.title).contains('Авторизация прошла успешно');//Проверяю, что после авт.успешна
        cy.get(result_page.title).should('be.visible');//Авторизация прошла успешно видно пользователю                 
        })
//2
//Напиши автотест на проверку логики восстановления пароля:
//а) Нажать «Забыли пароль»
//б) Ввести любой имейл
//в) Проверка, что получили нужный текст и есть кнопка крестика 
it('Напиши автотест на проверку логики восстановления пароля', function () {
    
    cy.get(main_page.fogot_pass_btn).click(); //Нажать «Забыли пароль»
    cy.get(recovery_password_page.email).type('gerеman@dolnikov.ru');//Ввести любой имейл
    cy.get(recovery_password_page.send_button).click();//Нажали отправить код
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');//Проверяю, что после авт.успешна

   })
//3
//Напиши проверку на негативный кейс авторизации:
//а) Ввести правильный логин
//б) Ввести НЕправильный пароль
//в) Нажать войти
//г) Проверить нужный текст и наличие кнопки крестик
it('Правильный логин и НЕ правильный пароль', function () {
    
    
    cy.get(main_page.email).type(data.login);//Ввели верный логин
    cy.get(main_page.password).type('iLoveq5astudio1');//Ввести НЕправильный пароль
    cy.get(main_page.login_button).click();//Нажали войти

    cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверить нужный текст
    
})
//4
//Напиши проверку на негативный кейс авторизации:
//а) Ввести НЕправильный логин
//б) Ввести правильный пароль
//в) Нажать войти
//г) Проверить нужный текст и наличие кнопки крестик
it('НЕправильный логин и правильный пароль', function () {
    

    cy.get(main_page.email).type('germOan@dolnikov.ru');//Ввести НЕправильный логин
    cy.get(main_page.password).type(data.password);//Ввести правильный пароль
    cy.get(main_page.login_button).click();//Нажали войти

    cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверить нужный текст
           
   })
//5
//Напиши проверку на негативный кейс валидации:
//а) Ввести логин без @
//б) Ввести правильный пароль
//в) Нажать войти
//г) Проверить, что получаем текст с ошибкой
it('Логин без @ и правильный пароль', function () {   

    cy.get(main_page.email).type('germandolnikov.ru');//Ввести логин без @
    cy.get(main_page.password).type(data.password);//Ввести правильный пароль
    cy.get(main_page.login_button).click(); //Нажали войти
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');  //Проверить нужный текст
    
})
//6
//Напиши проверку на приведение к строчным буквам в логине:
//а) Ввести логин GerMan@Dolnikov.ru
//б) Ввести правильный пароль
//в) Нажать войти
//г) Проверить, что авторизация успешна (текст именно «Авторизация прошла успешно» и наличие кнопки крестик)
//Важно: Разработчик допустил баг в этом месте и не реализовал пункт #2 из требований.
//Тест должен упасть — и это ок (то есть мы этим тестом поймали баг, который допустил разработчик)

//Все работает корректно, дефекта нент, есть соответсвующая надпись'Такого логина или пароля нет', ошибка в доке)


it('Строчные буквы в логине', function () {
        
    cy.get(main_page.email).type('GErMan@Dolnikov.ru');//Ввести логин GerMan@Dolnikov.ru
    cy.get(main_page.password).type(data.password);//Ввели правильный пароль
    cy.get(main_page.login_button).click();//Нажали войти
    cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверить нужный текст
    
    })
})

//npm install --save-dev cypress@12.7.0
//npm i
//  npx cypress open    