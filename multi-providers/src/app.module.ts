import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 类型	作用	典型场景
// 简写 / useClass	用类创建实例	普通服务、可替换实现
// useValue	直接提供固定值	配置、常量、mock
// useFactory	函数返回值	复杂创建逻辑、依赖其他 provider
// async useFactory	异步创建后注入	异步配置、数据库连接等
// useExisting	复用已有 provider	多 token 指向同一实现

// useClass	useExisting
// 会不会 new	会，用类再创建新实例	不会，只是多一个 token 指向已有实例
// 实例数量	新 token = 新实例（默认单例下每个 token 一个实例）	新 token 和原 token 共用同一个实例

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'app_service_1',
      useClass: AppService,
    },
    {
      provide: 'app_service_2',
      useValue: {
        name: 'a',
        age: 18,
      },
    },
    {
      provide: 'app_service_3',
      useFactory: () => {
        return {
          name: 'b',
          age: 20,
        };
      },
    },
    {
      provide: 'app_service_4',
      useFactory: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          name: 'c',
          age: 22,
        };
      },
    },
    // 要往 useFactory 里注入固定值，需先用 useValue 提供，再在 inject 里写 token
    {
      provide: 'PERSON_CONFIG',
      useValue: { name: 'person', age: 18 },
    },
    {
      provide: 'app_service_5',
      useFactory(
        person: { name: string; age: number },
        appService: AppService,
      ) {
        return {
          name: person.name,
          age: person.age,
          appService: appService.getHello(),
        };
      },
      // 顺序对应 useFactory 参数：inject[0] → person，inject[1] → appService
      inject: ['PERSON_CONFIG', AppService],
    },
    {
      provide: 'app_service_6',
      useExisting: 'app_service_4',
    },
  ],
})
export class AppModule {}
