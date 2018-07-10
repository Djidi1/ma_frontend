// Import Vue
import Vue from 'vue'

// Import vue-resource
import VueResource from 'vue-resource'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

/* Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
*/
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'



// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import AppStylesCustom from './assets/sass/custom.scss'

import FAicon from 'font-awesome/css/font-awesome.css';
import f7icons from 'framework7-icons/css/framework7-icons.css'
//Material icons
import "vue-material-design-icons/styles.css"


//Vue-localstorage
import VueLocalStorage from 'vue-ls'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './main.vue'

//Import Localization
import local_ru from "./static/local_ru"
import local_en from "./static/local_en"



// Init F7 Vue Plugin
Vue.use(Framework7Vue);
// Init Vue-ls
Vue.use(VueLocalStorage);
Vue.use(VueResource);

//Underscore.js
import underscore from 'vue-underscore'
Vue.use(underscore);


//Components
import List from './assets/vue/Components/list_audit.vue'
Vue.component('list', List);

import Object_list from './assets/vue/Components/object_list.vue'
Vue.component('list_object', Object_list);

import check_item from './assets/vue/Components/chek_item.vue'
Vue.component('check_item', check_item);

import textarea from './assets/vue/Components/textarea_comment.vue'
Vue.component('text_area', textarea);

import comment from './assets/vue/Components/comment.vue'
Vue.component('comment', comment);

import attachment from './assets/vue/Components/attachment.vue'
Vue.component('attachment', attachment);

import single_comment from './assets/vue/Components/single-comment.vue'
Vue.component('single_comment', single_comment);

import check_box from './assets/vue/Components/check_box_item.vue'
Vue.component('check_box_item', check_box);


import popup_new_object from './assets/vue/pages/popup_new_object.vue'
Vue.component('popup_new_object', popup_new_object);



// const be_server = "http://localhost:3000";

// Init App
new Vue({
    el: '#app',
    template: '<app/>',

    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        material: true,
        routes: Routes,
        scrollTopOnNavbarClick: true,
        hideNavbarOnPageScroll: true,
        hideToolbarOnPageScroll:true,
        swipePanel: 'left'
    },

    // Register App Component
    components: {
        app: App
    },

    data: {
        objects: [],
        auth_info: {},
        localization: {},
        check_list: {},
        settings: {},
        be_server: ""
    },
//наблюдаем за массивами, в случае изменения обновляем содержимое localstorage
    watch: {
        auth_info: function (val) {
            this.$ls.set('auth_info', val);
        },

        settings: function (val) {
            this.$ls.set('settings', val);
        },
        objects: function (val) {
            this.$ls.set('objects', val);
        },
        check_list: function (val) {
            this.$ls.set('check_list', val);
        },
        be_server:function(val){
            this.$ls.set('be_server',val);
        }
    },
    //При создании App устанавлива язык из локал сторейджа, если, Если язык не установлен(локалсторейдж пуст) устанавливаем русский по умолчанию.
    created() {
        let _this = this;
        //Берем переменную из локал сторейджа.
        this.settings = this.$ls.get('settings', 'ru');
        this.$ls.on('settings', function (val) {
            _this.settings = val;
        });
        //Настройки сервера и подключения
        this.be_server = this.$ls.get('be_server', 'https://server.mobit365.com:7443');
        this.$ls.on('be_server', function (val) {
            _this.be_server = val;
        });
        //Вызов метода установки языка.
        this.lang_select(this.settings);
    },

    //При отресовки App устанавливаем основныые массивы и переменные. Они берутся из локалсторейджа, если там что-то есть.
    // Если там пусто по-умолчанию устанавливаем пусто для всех переменныех.
    mounted: function () {
        //Бреме данные по пользователю.
        this.auth_info = this.$ls.get('auth_info', {auth: false, name: '', email: ''});
        let _this = this;
        this.$ls.on('auth_info', function (val) {
            _this.auth_info = val;
        });
        //Берем массив объектов, укаждого из которых есть свой массив аудитов, а у каждого аудита ест ьсвой массив чеклистов с позициями и комментариями.
        this.objects = this.$ls.get('objects', []);
        this.$ls.on('objects', function (val) {
            _this.list = val;
        });

        //Статичный-чек лист. Необходим для выбора чек листа при редактирование/создание новго аудита.
        this.check_list = this.$ls.get('check_list', '');
        this.$ls.on('check_list', function (val) {
            _this.check_list = val;
        });
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
            _this.go_back();
        }, false);

    },
    methods: {
        go_back() {
            let self = this;
            let $$ = Dom7;
            let element = $$(this.$el);
            if (element.find('.panel-left').hasClass('active')) {
                (this.$f7.getCurrentView().activePage.name === "settings") ? this.$f7.views[0].back() : this.$f7.closePanel();
                return false;
            } else {
                // if (element.find('.modal-in').length > 0) {
                //         self.$f7.closeModal();
                //         return false;
                // } else {
                    console.log(this.$f7.getCurrentView().activePage.name);
                    if ((this.$f7.getCurrentView().activePage.name === "audits_main") || (this.$f7.getCurrentView().activePage.name === "objects_main")) {
                        // this.$f7.confirm("",this.$root.localization.modal.modalTextConfExit, function () {
                        navigator.app.clearHistory();
                        navigator.app.exitApp();
                        // });
                    } else {
                        this.$f7.mainView.back();
                    }
                // }
            }
        },

        //Проверка авторизован ли пользователь.
        check_user_auth: function () {
            return (this.auth_info.auth)
        },

        //Метод установки языка приложения.
        lang_select: function (val) {
            switch (val) {
                case "ru":
                    this.localization = local_ru;
                    break;
                case "en":
                    this.localization = local_en;
                    break;
            }
            (this.$f7 !== undefined) ? this.changeModalLang() : "";
        },
        // //Функция обновления локал сторейджа. Сейчас неактивна.
        // update_ls: function () {
        //     this.$ls.set('objects', this.objects);
        // },
        //Изменения языка для кнопок модальных окон. Пришлось делать отдельно, т.к. это тметод можно вызывать только полсе загрузки $f7.
        changeModalLang: function () {
            this.$f7.params.modalButtonOk = this.localization.modal.modalOk;
            this.$f7.params.modalButtonCancel = this.localization.modal.modalCancel;
        },
        //Метод обновления данных с сервера при пулестраницы вниз.
        onRefresh(event, done) {
            let self = this;
            //Вызов метода получения данных с сервера
            this.$root.getData_from_server().then(result => {
                self.$root.objects = result.obj;
                self.down_att(result.res);
                done()
            })
        },
        //Метод получения данных от сервера.
        getData_from_server() {
            let self = this;
            //Возвращает промис, пока функция не вернет resolve крутиться прелоадер.
            return new Promise(function (resolve) {
                let objects_arr = [];
                let audits_arr = [];
                let result_audit = [];
                let result = [];
                //Вызов функции получения списка чек-листов.
                self.get_check_list().then(
                    ready => {
                        //В случае успешного выполнения, вызов метода по получению списка объектов.
                        return self.get_objects();
                    })
                    .then(objects => {
                        objects_arr = objects;
                        //Вызов метода по получению аудитов.
                        return self.get_audits();
                    })
                    .then(
                        audits => {
                            audits_arr = audits;
                            //Вызов метода по получению результатов по аудитам.
                            return self.get_results();
                        }
                    ).then(
                    results => {
                        result_audit = results;
                        //Вызов метода по созданию массива объектов для фронт-енда прилоения. Все полученные данные компонуются в один массив.
                        return self.create_object_list(objects_arr, audits_arr, results, self.check_list);
                    }
                ).then(
                    object_arr => {
                        result = object_arr;
                        //Вызов метода по установке результатов аудитов в итоговый массив объектов.
                        return self.getresults(result, result_audit, self.check_list)
                    }
                ).then(
                    result_arr => {
                        result = {};
                        //Когда все запросы прошли и итоговый массив готов возвращаем в result(resolve) объект с двумя поялми: obj- итоговый готовый массив объектов для App
                        //res - набор результатов аудитов полученный от сервера.
                        self.$set(result, 'obj', result_arr);
                        self.$set(result, 'res', result_audit);
                        return self.sort_data(result);

                    }
                ).then(
                    result_sort => {
                        resolve(result_sort)
                    }
                )
            });
        },
        //Сортировка данных по дате последнего аудита
        sort_data(result_sort) {
            let self = this;
            return new Promise(function (resolve) {

                result_sort.obj.forEach(function (itm) {
                    self.sort_audit_date(itm);
                });
                result_sort.obj.sort(function (a, b) {
                    return (b.audits.hasOwnProperty(0) && a.audits.hasOwnProperty(0))
                        ? new Date(b.audits[0].created_at) - new Date(a.audits[0].created_at)
                        : false;
                });
                resolve(result_sort);
            });
        },
        //Сортировка аудитов по дате
        sort_audit_date(arr) {
            arr.audits.sort(function (a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            });

        },


        //Метод получения от сервера списка чек-листов. POST
        get_check_list() {
            let self = this;
            return new Promise(function (resolve) {
                self.$http.post(self.be_server + '/api/get-checklists', {}, {headers: {'Authorization': 'Bearer ' + self.auth_info.token}}).then(
                    response => {
                        self.check_list = response.body;
                        resolve('ready');
                    }
                );
            });
        },
        //Метод получения от сервера списка объектов. POST.
        get_objects() {
            let self = this;
            let objects = [];
            return new Promise(function (resolve) {
                self.$http.post(self.be_server + '/api/get-objects', {}, {headers: {'Authorization': 'Bearer ' + self.auth_info.token}}).then(
                    response => {
                        objects = response.body;
                        resolve(objects)
                    }
                );
            });
        },
        //Метод получения от сервера списка аудитов. POST.
        get_audits() {
            let self = this;
            let audits = [];
            return new Promise(function (resolve) {
                self.$http.post(self.be_server + '/api/get-audits', {}, {headers: {'Authorization': 'Bearer ' + self.auth_info.token}}).then(
                    response => {
                        audits = response.body;
                        resolve(audits);

                    }
                );
            });

        },
        //Метод получения от сервера результатов аудитов. POST.
        get_results() {
            let self = this;
            let results = [];
            return new Promise(function (resolve) {
                self.$http.post(self.be_server + '/api/get-results', {}, {headers: {'Authorization': 'Bearer ' + self.auth_info.token}}).then(
                    response => {
                        results = response.body;
                        resolve(results);
                    }
                )
            });
        },
        //Метод создания итогового массива объектов. Все полученные ранее данные компануются в один массив.
        create_object_list(objects, audits) {
            let object_arr = [];
            return new Promise(function (resolve) {
                objects.forEach(function (object) {
                    let result = {};
                    result = {
                        "id": object.id,
                        "title": object.title,
                        "created_at": object.created_at,
                        "audits": [],
                        "address": (!object.audit_object_group)?"":object.audit_object_group.address,
                        "group_id":(!object.audit_object_group)?"":object.audit_object_group.id,
                        "group_title":(!object.audit_object_group)?"Нет группы":object.audit_object_group.title
                    };
                    audits.forEach(function (audit) {
                        if (object.id === audit.object_id) {
                            let audit_result = {
                                "id": audit.id,
                                "title": audit.title,
                                "date_add": audit.date_add,
                                "created_at": audit.created_at,
                                "check_list": [],
                                "comments": [],
                                "object_id": object.id,
                                "check_list_id": audit.checklist_id,
                                "upload": false,
                                "downloaded":true
                            };
                            result.audits.push(audit_result);
                        }
                    });
                    object_arr.push(result);
                });
                resolve(object_arr);
            });
        },
        //Метод установки для итогового массива результатов.
        getresults(result_arr, results, checklist) {
            let self = this;
            return new Promise(function (resolve) {
                result_arr.forEach(function (obj) {
                    obj.audits.forEach(function (audits) {
                        checklist.forEach(function (cl) {
                            if (cl.id === audits.check_list_id) {
                                //вызов метода сопоставления результатов и итоговог омассива. Чек-листы.
                                //Вызов идет через промисы, т.к. я пытался тут же и загружать изображения с сервера через плагины Cordova. В итоге не получилось, но переписывать работающие методы не стал.
                                self.create_rq_promise(cl, audits, results).then(new_cl => {
                                    audits.check_list.push(new_cl);
                                    self.check_status_upload(audits);
                                });
                            }
                        });
                    });
                });
                resolve(result_arr);
            });
        },

        //Метод собирает для итогового массива массив чеклистов для каждого аудита.
        create_rq_promise(cl, audits, results) {
            let self = this;
            return new Promise(function (resolve) {
                let new_cl = {
                    "id": cl.id,
                    "title": cl.title,
                    "created_at": cl.created_at,
                    "requirement": [],
                    "audit_id": audits.id
                };
                self.create_att_from_res(cl, audits, results).then(result => {
                    new_cl.requirement = result;
                    resolve(new_cl)
                });
            });
        },
        //Метод собирает для требвоания для чек-листов итогового массива.
        create_att_from_res(cl, audits, results) {
            let self = this;
            let result = [];
            return new Promise(function (resolve) {
                cl.requirement.forEach(function (req) {
                    let new_req = {
                        "id": req.id,
                        "title": req.title,
                        "status": self.get_status(audits, results, req.id),
                        "checklist_id": cl.id,
                        "warning_level": req.warning_level,
                        "created_at": req.created_at,
                        "comments": [],
                        "disabled": (self.get_status(audits, results, req.id) === 2)
                    };
                    self.create_comment(audits, results, req.id).then(res => {
                        new_req.comments = res;
                    });
                    result.push(new_req);
                });
                resolve(result)
            });
        },
        //Метод собирает комментари для требоаний итогового массива.
        create_comment(audits, results, id) {
            let self = this;
            let res = [];
            return new Promise(function (resolve) {
                results.forEach(function (itm) {
                    if (itm.audit_id === audits.id && itm.requirement_id === id) {
                        if (itm.text !== undefined || itm.audit_result_attache.length > 0) {
                            let comm = {
                                "text": itm.comment,
                                "attachments": []
                            };
                            self.attach_get(itm).then(result_att => {
                                comm.attachments = result_att;
                                res.push(comm);
                            });
                        }
                    }
                });
                resolve(res);
            });
        },
        //Метод собирае вложения для комментариев к требованиям.
        attach_get(itm) {
            let result_att = [];
            return new Promise(function (resolve) {
                itm.audit_result_attache.forEach(function (att) {
                    let new_att = {
                        "caption": att.file_name,
                        "file": {
                            "name": att.file_name,
                            "size": att.file_size,
                            "type": att.file_mime
                        },
                        "url": att.file_path
                    };
                    result_att.push(new_att);
                });
                resolve(result_att);
            })
        },
        //Метод загружает с сервера вложение.
        down_att(res) {
            let self = this;
            //Пришлось делать этот метод отдельно. Сначала он перебирает итоговый массив и для тех по кому есть результаты грузит изображения.
            this.objects.forEach(function (obj) {
                obj.audits.forEach(function (ad) {
                    ad.check_list.forEach(function (ch) {
                        ch.requirement.forEach(function (req) {
                            res.forEach(function (itm) {
                                if (itm.audit_id === ad.id && itm.requirement_id === req.id) {
                                    req.comments.forEach(function (comm) {
                                        comm.attachments.forEach(function (att, k, att_arr) {
                                            //Метод загрузки вложений с сервера.
                                            //att.url - ссылка на изображения из базы.
                                            self.get_img_frome_base(att.url).then(
                                                result => {
                                                    //Когда получаем результат устанавливаем его в нужное поле для вложения в комментарие.
                                                    att.url = result;
                                                    //Обновляем локал сторейдж, перезаписываем путь до картинки, которая теперь храниться в файловой системе устройства.
                                                    self.$ls.set('objects', self.$root.objects);
                                                },
                                                error => {
                                                    //В случае ошибки загрузки, удаляем из массива вложений к коментарию то вложения которое не удалось загрузить.
                                                    att_arr.splice(k, 1);
                                                    self.$ls.set('objects', self.$root.objects);
                                                }
                                            );
                                        });
                                    });
                                }
                            });

                        });
                    });
                });
            });
        },
        //Метод по получению статуса для требования. -1 отрицательн, 0 новый, 1 положительно, 2 не применимо.
        get_status(audit, result, id) {
            let res = 0;
            result.forEach(function (itm) {
                res = (itm.audit_id === audit.id) ? (itm.requirement_id === id) ? itm.result : res : res;
            });
            return res;
        },
        // Проверяем збыло ли загружены сведения по аудиту. На данный момент это проверяется через статус.
        // Если все позиции требовния чек-лиса имеют статус отличный от 0, то аудит считается загруженным, и его нельзя редактировать.
        check_status_upload(arr) {
            let res = false;
            let upload = true;
            arr.check_list.forEach(function (cl) {
                cl.requirement.forEach(function (req) {
                    upload = (req.status === 0) ? false : upload;
                });
                res = upload;
            });
            arr.upload = res;
        },

        //Метод загрузки изображения через кордовавский плагин.
        get_img_frome_base(url) {
            let self = this;
            let file_name = url.split('/');
            let result = '';
            return new Promise(function (resolve, reject) {
                //находим директорию в которую собираемся загружать картинку.
                window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
                        //Устанавливаем URl с которого будем грузить картинку.
                        let url_load = self.be_server + url;
                        url_load = encodeURI(url_load);
                        //Берем субдиректорию в каталоге приложения в файловой системе телефона.
                        //Если такой директории нет, то плагин ее создает.
                        dirEntry.getDirectory('img', {create: true}, function (dirEntry_sub) {
                                //Берем файл в указанной субдиректории, если файла нет, то создаем его.
                                dirEntry_sub.getFile(file_name[3], {create: true, exclusive: false}, function (fileEntry) {
                                        //Выозв метода загрузки вложения при помощи плагина Cordova
                                        //Передаем в метод объект ентри (файл в файловой системе устройства), URl откуда качать файл, имя файла.
                                        self.download(fileEntry, url_load, file_name[3]).then(
                                            ready => {
                                                //В случаае успеха возвращаем ссылку на файл в файловой системе телефона.
                                                result = ready;
                                                resolve(result)
                                            },
                                            error => {
                                                reject(error)
                                            }
                                        )
                                    },
                                    function () {
                                        let error = 'error_file_get';
                                        reject(error);
                                    })
                            },
                            function () {
                                let error = 'error_create_dir';
                                reject(error);
                            });
                    },
                    function () {
                        result = 'error_file_system';
                        reject(result);
                    });
            });

        },
        download(fileEntry, uri) {
            let self = this;
            let file_tr = new FileTransfer();
            //Получаем ссылку на файл в файловой системе устройства из ентри объекта.
            let fileURL = fileEntry.toURL();
            let ready;
            return new Promise(function (resolve, reject) {
                //Загружаем файл.
                file_tr.download(
                    uri,//откуда качаем.
                    fileURL,//Куда качаем.
                    function (entry) {
                        //Получаем путь до загруженного файла.
                        ready = entry.toURL();
                        resolve(ready)
                    }, function (error) {
                        console.log("download error target " + error.target());
                        let error_msg = 'error_download';
                        reject(error_msg)
                    },
                    false
                );
            });
        },
        //Метод проверки позицый аудита
        check_audit_positions(audit){
            let self=this;
            let result=true;
            audit.check_list.forEach(function(position){
                position.requirement.forEach(function(req){
                    result=(req.status===0)?false:result;
                });
            });
            return result;
        },

        //Отправка данных на сервер
        send_to_serv_audit(audit) {
            let self = this;
            //Вызов модального подтвержедния действия.
            this.$f7.confirm(this.$root.localization.modal.modalConfirmSend, this.$root.localization.modal.modalTextConf, function () {
                self.$f7.showPreloader(self.$root.localization.modal.preloader);
                //Формирование массива на отправку.
                let requs = {
                    "audit": {
                        "check_list": self.get_req(audit),//массив чек листов
                        "id": 0,
                        "object_id": audit.object_id,
                        "date_add": self.GetCurrentDate(audit),//Текущая дата.
                        "title": audit.title,
                        "comment": self.get_audit_comments(audit)
                    },
                };
                //Метод отправки на сервер.
                self.send_data_to_sev(requs, audit);
            });
        },

        //Метод создания массива чеклистов для отправки
        get_req(audit) {
            let self = this;
            let result = [];
            audit.check_list.forEach(function (item) {
                let check_obj = {
                    "audit_id": audit.id,
                    "id": item.id,
                    "title": item.title,
                    "requirement": []
                };
                item.requirement.forEach(function (req) {
                    let req_obj = {
                        "id": req.id,
                        "status": self.get_current_status_to_send(req),
                        "comments": self.get_comments(req),
                    };
                    check_obj.requirement.push(req_obj);
                });
                result.push(check_obj);
            });
            return result;
        },
        //Получаем текущий статус позиций чек листа. заодно все что 0 устанавливаем как -1.
        get_current_status_to_send(req) {
            req.status = (req.disabled) ? 2 : (req.status === 0) ? -1 : req.status;
            this.$ls.set('objects', this.$root.objects);
            return (req.disabled) ? 2 : (req.status === 0) ? -1 : req.status;
        },
        //Сборка комментариев к аудиту
        get_audit_comments(audit) {
            let result = [];
            audit.comments.forEach(function (comm) {
                let com = {
                    "text": comm.text
                };
                result.push(com);
            });
            return result;
        },
        //Сборка коментариев к требованиям.
        get_comments(req) {
            let self = this;
            let result = [];
            req.comments.forEach(function (comm) {
                let comment_obj = {
                    'text': comm.text,
                    'attachments': self.get_attachments_comments(comm)
                };
                result.push(comment_obj);
            });
            return result;
        },
        //формируем вложения для комментариев. На данный момент тестируется можно ли сразу и получить base64 кодировку изображения.
        // В случае не успеха метод enccode_base64 будет вызватсья отедльно перед отправкой на сервер.
        get_attachments_comments(comm) {
            let result = [];
            comm.attachments.forEach(function (att) {
                let new_att = {
                    "caption": att.caption,
                    "file": {
                        "name": att.file.name,
                        "size": att.file.size,
                        "type": att.file.type
                    },
                    "url": att.url
                };
                result.push(new_att);
            });
            return result;
        },
        //Получить дату создания.
        GetCurrentDate(audit) {
            let data = new Date(audit.date_add);
            let curSec = ('0' + data.getSeconds()).substr(-2);
            let curMin = ('0' + data.getMinutes()).substr(-2);
            let curDay = ('0' + data.getDate()).substr(-2);
            let curMounth = ('0' + (data.getMonth() + 1));
            return curDay + "-" + curMounth + "-" + data.getFullYear() + " " + data.getHours() + ":" + curMin + ":" + curSec;
        },

        //Отправка даных на сервер.
        send_data_to_sev(data, audit) {
            let self = this;
            self.create_promises(data).then(
                promises => {
                    Promise.all(promises).then(values => {
                        this.$http.post(self.be_server + '/api/put-audits', data, {headers: {'Authorization': 'Bearer ' + this.auth_info.token}}).then(
                            response => {
                                //В случае успеха устанавливаем для отправленного аудита, айдишник и флаг upload в true.
                                self.$f7.hidePreloader();
                                self.$set(audit, "id", response.body);
                                self.$set(audit, "upload", true);
                                self.$ls.set('objects', self.$root.objects);
                            });
                    });
                }
            )
        },

        create_promises: function (data) {
            let self = this;
            let promises = [];
            return new Promise(function (resolve) {
                data.audit.check_list.forEach(function (ch) {
                    ch.requirement.forEach(function (req) {
                        req.comments.forEach(function (comm) {
                            comm.attachments.forEach(function (att) {
                                promises.push(self.encode_to_base64(att));
                            });
                        })
                    })
                });
                resolve(promises);
            })
        },
        //Кодирование изображения
        encode_to_base64(att) {
            let self = this;
            return new Promise(function (resolve) {
                window.resolveLocalFileSystemURL(att.url, function (f) {
                    f.file(function (file) {
                        let reader = new FileReader();
                        reader.onloadend = function (ff) {
                            att.url = ff.target.result;
                            resolve(ff.target.result);
                        };
                        reader.readAsDataURL(file);
                    });
                });
            });
        }


    }

});
