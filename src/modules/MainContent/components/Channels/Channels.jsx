import React, {useState} from 'react'
import { ModalWindow } from '../ModalWindow/ModalWindow';

export const Channels = () => {
    const works = [
        { id: 1, title: 'Работа 1', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/330/709/large/tatyana-kupriyanova-first-render00010215.jpg?1745508411' },
        { id: 2, title: 'Работа 2', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/312/543/large/eric-cousin-51-basse-def.jpg?1745453211' },
        { id: 3, title: 'Работа 3', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/338/053/4k/tyler-ryan-design05.jpg?1745514614' },
        { id: 4, title: 'Работа 4', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/326/104/large/fedorov-rustam-0.jpg?1745494221' },
        { id: 5, title: 'Работа 5', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/294/249/large/heuu__-484252656-618866781116343-575507366022332633-n.jpg?1745416178' },
        { id: 6, title: 'Работа 6', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/359/118/large/yuliya-halauko-6.jpg?1745578085' },
        { id: 7, title: 'Работа 7', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/382/372/4k/annina-weber-mongolset1-1c.jpg?1745626133' },
        { id: 8, title: 'Работа 8', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/207/221/large/zhuwang-hua-1.jpg?1745216938' },
        { id: 9, title: 'Работа 9', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/385/769/large/youwei-ju-2222.jpg?1745639905' },
        { id: 10, title: 'Работа 10', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/341/975/4k/daniel-merticariu-the-crone-render-1.jpg?1745522127' },
        { id: 11, title: 'Работа 11', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/280/329/large/cristian-marius-buliarca-uribe-painta-1.jpg?1745383355' },
        { id: 12, title: 'Работа 12', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/388/716/large/susheel-kumar-tbrender-viewport-002.jpg?1745653056' },
        { id: 13, title: 'Работа 13', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/226/505/large/maria-gehrke-render-render-camera-00.jpg?1745252613' },
        { id: 14, title: 'Работа 14', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/223/046/large/ink-cammy-004.jpg?1745246528' },
        { id: 15, title: 'Работа 15', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/323/172/4k/gino-luka-kolling-render4.jpg?1745495036' },
        { id: 16, title: 'Работа 16', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/093/299/large/marcus-fall-comp11-r02-dragon-01-l.jpg?1744866639' },
        { id: 17, title: 'Работа 17', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/266/183/4k/jan-sieber-23.jpg?1745344664' },
        { id: 18, title: 'Работа 18', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/391/509/large/mike-jordana-natural-zero-deepstriker.jpg?1745663283' },
        { id: 19, title: 'Работа 19', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/384/938/large/bogdan-rezunenko-xiansai-assasin-copy.jpg?1745636718' },
        { id: 20, title: 'Работа 20', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/393/129/4k/ivan-podzorov-1.jpg?1745668228' },
        { id: 21, title: 'Работа 21', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/081/290/893/large/sam-king-charcombo02.jpg?1729856197' },
        { id: 22, title: 'Работа 22', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/387/649/large/-01-2.jpg?1745648041' },
        { id: 23, title: 'Работа 23', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/390/007/large/eugen-ich-00002.jpg?1745658219' },
        { id: 24, title: 'Работа 24', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/008/148/413/large/sam-king-sam-king-firewarrior-final-render01.jpg?1510778910' },
        { id: 25, title: 'Работа 25', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/045/425/915/large/sam-king-render1.jpg?1642688202' },
        { id: 26, title: 'Работа 26', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/071/751/563/large/sam-king-orc01-n.jpg?1705870205' },
        { id: 27, title: 'Работа 27', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/072/174/773/large/sam-king-githn3.jpg?1706774423' },
        { id: 28, title: 'Работа 28', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/377/400/4k/hazel-brown-untitled-viewport.jpg?1745612987' },
        { id: 29, title: 'Работа 29', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/260/208/4k/matteo-boccardi-aw-smile-closeup.jpg?1745333497' },
        { id: 30, title: 'Работа 30', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/197/439/large/yuditya-afandi-daredevil-artstation.jpg?1745172988' },
        { id: 31, title: 'Работа 31', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/329/890/4k/dylan-kowalski-zbrush-02.jpg?1745501415' },
        { id: 32, title: 'Работа 32', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/212/139/large/pengcong-pan-untitled-viewport-062.jpg?1745221817' },
        { id: 33, title: 'Работа 33', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/287/221/large/igor-2a.jpg?1745560617' },
        { id: 34, title: 'Работа 34', imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/087/003/359/4k/-c01.jpg?1744649684' },
        { id: 35, title: 'Работа 35', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 36, title: 'Работа 36', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 37, title: 'Работа 37', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 38, title: 'Работа 38', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 39, title: 'Работа 39', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/317/362/large/carlo-balassu-deskcontrols-01-2025.jpg?1745471473' },
        { id: 40, title: 'Работа 40', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 41, title: 'Работа 41', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 42, title: 'Работа 42', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 43, title: 'Работа 43', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 44, title: 'Работа 44', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/317/362/large/carlo-balassu-deskcontrols-01-2025.jpg?1745471473' },
        { id: 45, title: 'Работа 45', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 46, title: 'Работа 46', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 47, title: 'Работа 47', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 48, title: 'Работа 48', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
        { id: 49, title: 'Работа 49', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/317/362/large/carlo-balassu-deskcontrols-01-2025.jpg?1745471473' },
        { id: 50, title: 'Работа 50', imageUrl: 'https://cdna.artstation.com/p/assets/images/images/087/171/742/4k/eugene-c-stormregulator00.jpg?1745085468' },
      ];
      const users =[
            { id: 1, name: 'Алексей Иванов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 2, name: 'Мария Смирнова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 3, name: 'Иван Петров', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 4, name: 'Ольга Кузнецова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 5, name: 'Дмитрий Соколов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 6, name: 'Екатерина Волкова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 7, name: 'Сергей Васильев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 8, name: 'Анна Морозова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 9, name: 'Никита Попов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 10, name: 'Татьяна Лебедева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 11, name: 'Артем Козлов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 12, name: 'Елена Новикова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 13, name: 'Максим Федоров', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 14, name: 'Виктория Михайлова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 15, name: 'Кирилл Захаров', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 16, name: 'Алина Васильева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 17, name: 'Владимир Дмитриев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 18, name: 'Полина Григорьева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 19, name: 'Егор Орлов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 20, name: 'София Никитина', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 21, name: 'Илья Тимофеев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 22, name: 'Вера Павлова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 23, name: 'Роман Голубев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 24, name: 'Анастасия Баранова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 25, name: 'Олег Виноградов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 26, name: 'Ксения Беловa', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 27, name: 'Андрей Сидоров', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 28, name: 'Елизавета Комарова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 29, name: 'Павел Жуков', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 30, name: 'Дарья Сергеева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 31, name: 'Руслан Киселев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 32, name: 'Людмила Сорокина', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 33, name: 'Антон Яковлев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 34, name: 'Светлана Пономарева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 35, name: 'Вячеслав Абрамов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 36, name: 'Алёна Антонова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 37, name: 'Степан Гаврилов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 38, name: 'Ирина Маслова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 39, name: 'Даниил Тарасов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 40, name: 'Наталья Фролова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 41, name: 'Борис Беляев', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 42, name: 'Злата Чернова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 43, name: 'Михаил Макаров', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 44, name: 'Ангелина Савельева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 45, name: 'Григорий Борисов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 46, name: 'Яна Медведева', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 47, name: 'Василий Архипов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 48, name: 'Диана Данилова', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 49, name: 'Константин Сафонов', avatarUrl: 'https://avatar.iran.liara.run/public/50' },
            { id: 50, name: 'Снежана Кудрявцева', avatarUrl: 'https://avatar.iran.liara.run/public/50' }          
      ];
      const [selectedWork, setSelectedWork] = useState(null);
      const handleWorkClick = (work) => {
        setSelectedWork(work);
      };
      const handleCloseModal = () => {
        setSelectedWork(null);
      }
  return (
<div className="p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-1">
    {works.map((work, index) => (
      <div key={work.id} className="relative group overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow bg-gray-100" onClick={() => handleWorkClick(work)}>
        <img 
          src={work.imageUrl} 
          alt={work.title} 
          className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105" 
        />
        
        {/* Затемнение при наведении */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition duration-300 z-10"></div>
        
        {/* Заголовок и пользователь */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 space-y-1 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            {work.title}
          </h3>
          <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <img 
              src={users[index % users.length].avatarUrl} 
              alt={users[index % users.length].name} 
              className="w-6 h-6 rounded-full object-cover" 
            />
            <span className="text-white text-sm">{users[index % users.length].name}</span>
          </div>
        </div>

      </div>
    ))}
  </div>
  {selectedWork && (
    <ModalWindow work={selectedWork} onClose={handleCloseModal} />
  )}
</div>
  )
}
