import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { Auth } from '../../utility-level/decorators/auth.decorator';

/** Порт, который занимает REST-API */
const port = process.env.BACKEND_PORT_WEBSOCKET ?? 3001;

@WebSocketGateway(Number(port), {
  cors: {
    origin: '*',
  },
  cookie: true,
  namespace: 'socket-io-nest-backend',
})
export class SocketIOGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  /** Массив всех клиентов подключенных к нашему WebSocket серверу */
  allClients: Socket[] = [];

  /** Экземпляр текущего WebSocket сервера */
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.server = server;

    // throw new WsException('Invalid credentials.');
  }

  /**
   * Событие вызываемое при подключении WebSocket клиента
   * @param {Socket} client - Объект клиента который подключается
   * @returns {void} - Метод ничего не возвращает
   * @public
   */
  public handleConnection(
    @ConnectedSocket() client: Socket,
    ...args: any[]
  ): void {
    if (!this.getClientByClientObject(client)) {
      this.addClient(client);
    }
  }

  /**
   * Событие вызываемое при отключении WebSocket клиента
   * @param {Socket} client - Объект клиента который отключается
   * @returns {void} - Метод ничего не возвращает
   * @public
   */
  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    if (this.getClientByClientObject(client)) {
      this.removeClient(client);

      client.disconnect(true);
    }
  }

  /**
   * Событие сработает если что-то пришло по адресу "kuba-nest-backend-path"
   * @param {any} dto - Данные которые пришли от клиента по адресу "kuba-nest-backend-path"
   * @param {Socket} client - Клиент который участвовал в отправке данных
   * @returns {void} - Метод ничего не возвращает
   * @public
   */
  @SubscribeMessage<string>('kuba-nest-backend-path')
  @Auth({
    defendType: 'ws',
  })
  public handleEvent(
    @MessageBody() dto: any,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Нам пришло:', dto);
    this.server.emit('kuba-angular-frontend-path', dto);
  }

  /**
   * Добавить клиента в массив клиентов по полному объекту клиента
   * @param {Socket} client - Полный объект клиента, который будет добавлен в массив клиентов
   * @returns {Socket[]} - Новый массив клиентов, куда был добавлен новый клиент (с учетом нового клиента)
   * @public
   */
  public addClient(client: Socket): Socket[] {
    this.allClients.push(client);

    return this.allClients;
  }

  /**
   * Удалить клиента если он был в массиве клиентов по полному объекту клиента
   * @param {Socket} clientApplicantVerification - Объект клиента которого мы удалим
   * @returns {Socket[]} - Функция вернет мутированный массив клиентов без клиента который был удален
   * @public
   */
  public removeClient(clientApplicantDeletion: Socket): Socket[] {
    this.allClients = this.allClients.filter((clientItem: Socket) => {
      if (clientItem.id === clientApplicantDeletion.id) {
        return false;
      } else {
        return true;
      }
    });

    return this.allClients;
  }

  /**
   * Получить клиента если он есть в массиве клиентов по полному объекту клиента
   * @param {Socket} clientApplicantVerification - Объект клиента которого мы ищем
   * @returns {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined} - Объект найденного
   * @public
   */
  public getClientByClientObject(
    clientApplicantVerification: Socket,
  ):
    | Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    | undefined {
    const findedClient = this.allClients.find((clientItem: Socket) => {
      if (clientItem.id !== clientApplicantVerification.id) {
        return false;
      } else {
        return true;
      }
    });

    return findedClient;
  }
}
