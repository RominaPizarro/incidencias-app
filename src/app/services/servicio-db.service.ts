import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { Estado } from '../models/estado';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root',
})
export class ServicioDBService {
  public database!: SQLiteObject;

  queryTableEstado =
    'CREATE TABLE IF NOT EXISTS estado(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(45) NOT NULL, descripcion TEXT, UNIQUE(nombre));';
  queryTableRol =
    'CREATE TABLE IF NOT EXISTS rol(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(45) NOT NULL, descripcion TEXT, UNIQUE(nombre));';
  queryTableUsuario = `CREATE TABLE IF NOT EXISTS usuario(
      id INTEGER PRIMARY KEY autoincrement,
      nombres VARCHAR(45) NOT NULL,
      apellidos VARCHAR(45) NOT NULL,
      documentoIdentidad VARCHAR(45) NOT NULL,
      email VARCHAR(45) NOT NULL,
      username VARCHAR(45) NOT NULL,
      password VARCHAR(45) NOT NULL,
      rolId INTEGER NOT NULL,
      UNIQUE(username),
      FOREIGN KEY(rolId) REFERENCES rol(id)
      );`;
  queryTableIncidencia = `CREATE TABLE IF NOT EXISTS incidencia(
      id INTEGER PRIMARY KEY autoincrement,
      codigo VARCHAR(45) NOT NULL,
      nombre VARCHAR(45) NOT NULL,
      fecha DATE NOT NULL,
      estadoId INTEGER NOT NULL,
      area VARCHAR(45) NOT NULL,
      descripcion VARCHAR(45) NOT NULL,
      usuarioReportaId INTEGER NOT NULL,
      UNIQUE(codigo),
      FOREIGN KEY(usuarioReportaId) REFERENCES usuario(id),
      FOREIGN KEY(estadoId) REFERENCES estado(id)
      );`;

  queryDefaultRol = `INSERT INTO Rol(
        nombre,
        descripcion
        ) VALUES ('Administrador', '');`;

  queryDefaultUsuario = `INSERT INTO Usuario(
      nombres,
      apellidos,
      documentoIdentidad,
      email,
      username,
      password,
      rolId
      ) VALUES ('ROMINA LORETO','PIZARRO CABANAS','Default','Default','admin','admin',1);`;

  listaEstados = new BehaviorSubject([]);
  listaRoles = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);
  listaIncidencias = new BehaviorSubject([]);

  dataAPI = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
    this.createBD();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe',
    });
    await toast.present();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.queryTableEstado, []);
      await this.database.executeSql(this.queryTableRol, []);
      await this.database.executeSql(this.queryTableUsuario, []);
      await this.database.executeSql(this.queryTableIncidencia, []);

      this.isDBReady.next(true);

      await this.listarUsuarios();
      await this.insertarDefault();
    } catch (e) {
      this.presentToast('Error creando tablas: ' + e);
    }
  }

  async insertarDefault() {
    try {
      if (this.listaUsuarios.value.length == 0) {
        await this.database.executeSql(this.queryDefaultRol, []);
        await this.database.executeSql(this.queryDefaultUsuario, []);
        this.presentToast('Administrador inicializado ');
      }

      await this.listarRoles();
      await this.listarUsuarios();
      await this.listarEstados();
      await this.listarIncidencias();
    } catch (e) {
      this.presentToast('Error insertando datos: ' + JSON.stringify(e));
    }
  }

  createBD() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'gestion_incidencias.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.crearTablas();
        })
        .catch((e) => {
          this.presentToast('Error BD: ' + e);
        });
    });
  }

  //Servicios
  listarEstados() {
    const query = 'SELECT * FROM estado';
    const params: any[] = [];

    return this.database.executeSql(query, params).then((res) => {
      let data: Estado[] = [];
      const length = res.rows.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          data.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
          });
        }
      }

      this.listaEstados.next(data as any);
    });
  }

  agregarEstado(o: any) {
    const query = 'INSERT INTO estado(nombre, descripcion) VALUES (?,?)';
    const params: any[] = [o.nombre, o.descripcion];

    return this.database.executeSql(query, params).then((res) => {
      this.listarEstados();
    });
  }

  //Roles
  listarRoles() {
    const query = 'SELECT * FROM Rol';
    const params: any[] = [];

    return this.database.executeSql(query, params).then((res) => {
      let data: Rol[] = [];
      const length = res.rows.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          data.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            descripcion: res.rows.item(i).descripcion,
          });
        }
      }

      this.listaRoles.next(data as any);
    });
  }

  agregarRol(o: any) {
    const query = 'INSERT INTO Rol(nombre, descripcion) VALUES (?,?)';
    const params: any[] = [o.nombre, o.descripcion];

    return this.database.executeSql(query, params).then((res) => {
      this.listarRoles();
    });
  }

  //Usuarios
  listarUsuarios() {
    const query =
      'SELECT u.*, r.nombre as rolNombre FROM Usuario u INNER JOIN Rol r ON r.id = u.rolId';
    const params: any[] = [];

    return this.database.executeSql(query, params).then((res) => {
      let data: Usuario[] = [];
      const length = res.rows.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          data.push({
            id: res.rows.item(i).id,
            nombres: res.rows.item(i).nombres,
            apellidos: res.rows.item(i).apellidos,
            documentoIdentidad: res.rows.item(i).documentoIdentidad,
            email: res.rows.item(i).email,
            username: res.rows.item(i).username,
            password: res.rows.item(i).password,
            rolId: res.rows.item(i).rolId,
            rolNombre: res.rows.item(i).rolNombre,
          });
        }
      }

      this.listaUsuarios.next(data as any);
    });
  }

  loginUsuario(username: string, password: string) {
    const query = `SELECT u.*, r.nombre as rolNombre FROM Usuario u
    INNER JOIN rol r ON r.id = u.rolId
    WHERE u.username = ? AND u.password = ?`;
    const params: any[] = [username, password];

    return this.database.executeSql(query, params);
  }

  agregarUsuario(o: any) {
    const query = `INSERT INTO Usuario(
      nombres,
      apellidos,
      documentoIdentidad,
      email,
      username,
      password,
      rolId
      ) VALUES (?,?,?,?,?,?,?)`;
    const params: any[] = [
      o.nombres,
      o.apellidos,
      o.documentoIdentidad,
      o.email,
      o.username,
      o.password,
      o.rolId,
    ];

    return this.database.executeSql(query, params).then((res) => {
      this.presentToast('Listando usuarios. ' + res);
      this.listarUsuarios();
    });
  }

  //Incidencias
  listarIncidencias() {
    const query = `SELECT i.*, u.nombres || ' ' || u.apellidos as usuarioReporta, e.nombre as estadoNombre
      FROM Incidencia i
      INNER JOIN estado e ON e.id = i.estadoId
      INNER JOIN usuario u ON u.id = i.usuarioReportaId

      `;
    const params: any[] = [];

    return this.database.executeSql(query, params).then((res) => {
      let data: Incidencia[] = [];
      const length = res.rows.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          data.push({
            id: res.rows.item(i).id,
            codigo: res.rows.item(i).codigo,
            fecha: res.rows.item(i).fecha,
            nombre: res.rows.item(i).nombre,
            area: res.rows.item(i).area,
            descripcion: res.rows.item(i).descripcion,
            usuarioReportaId: res.rows.item(i).usuarioReportaId,
            estadoId: res.rows.item(i).estadoId,
            usuarioReporta: res.rows.item(i).usuarioReporta,
            estadoNombre: res.rows.item(i).estadoNombre,
          });
        }
      }

      this.listaIncidencias.next(data as any);
    });
  }

  agregarIncidencia(o: any) {
    const query = `INSERT INTO Incidencia(
      codigo,
      nombre,
      area,
      fecha,
      estadoId,
      descripcion,
      usuarioReportaId
      ) VALUES (?,?,?,?,?,?,?)`;
    const params: any[] = [
      o.codigo,
      o.nombre,
      o.area,
      o.fecha,
      o.estadoId,
      o.descripcion,
      o.usuarioReportaId,
    ];

    return this.database.executeSql(query, params).then((res) => {
      this.listarIncidencias();
    });
  }
  //Suscripciones

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchEstados(): Observable<Estado[]> {
    return this.listaEstados.asObservable();
  }

  fetchRoles(): Observable<Rol[]> {
    return this.listaRoles.asObservable();
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchIncidencias(): Observable<Incidencia[]> {
    return this.listaIncidencias.asObservable();
  }

  fetchData(): Observable<any[]> {
    return this.dataAPI.asObservable();
  }

  /*
  consumirAPI(): Observable<any> {
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    return this.http.get(baseUrl).pipe(retry(3));
  }
  */
}
