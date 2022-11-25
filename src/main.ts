import { stripIndents } from 'common-tags';
import { config } from 'dotenv';
import { stdout } from 'process';
import { VK } from 'vk-io';

import { messagesFilter, rate, trigger } from './middlewares';
import { pick } from './utils';

config();
const { updates } = new VK({ token: process.env.VK_TOKEN! });

updates.use(messagesFilter({ accept: process.env.VK_ACCEPT_MESSAGES as any }));

updates.use(
  rate({
    name: 'мемир',
    regexp: /(м[е|и]мир|mem[e|ee]r)/gim
  })
);
updates.use(
  rate({
    name: 'домосед'
  })
);
updates.use(
  rate({
    name: 'pickle',
    regexp: /(pickle|огурец|пикл)/gim
  })
);
updates.use(
  trigger({
    name: 'кошелек',
    regexp: /(кошел[её]+к)/gim,
    message: 'лежит'
  })
);
updates.use(
  trigger({
    name: 'tool 42',
    regexp: /(tool42|тул42|tool 42|тул 42)/gim,
    message: {
      attachment: 'photo-201644556_457239037'
    }
  })
);
updates.use(
  rate({
    name: 'artsocial',
    regexp: /(artsocial|артсоциал|артсошал)/gim,
    highRateThreshold: 1
  })
);
updates.use(
  trigger({
    name: 'антон',
    message: 'антон школьник'
  })
);
updates.use(
  trigger({
    name: 'sun9-2',
    message: { attachment: 'photo-201644556_457239038' }
  })
);
updates.use(
  trigger({
    name: 'чел',
    regexp: /(чел|dude)/gim,
    message: { sticker_id: 55330 }
  })
);
updates.use(
  trigger({
    name: 'аче всмысле',
    regexp: /(ач[е|ё] всмысле)/gim,
    message: { sticker_id: 53121 }
  })
);
updates.use(
  trigger({
    name: 'член',
    message: {
      attachment: 'photo-201644556_457239039'
    }
  })
);
updates.use(
  trigger({
    name: 'матик',
    regexp: /(мати[к|з]|matiq)/gim,
    message: () => ({
      attachment: pick(
        'photo-201644556_457239042',
        'photo-201644556_457239043',
        'photo-201644556_457239044',
        'photo-201644556_457239045'
      )
    })
  })
);
updates.use(
  trigger({
    name: 'кислинка',
    regexp: /(кислинка|иван охлобыстин)/gim,
    message: {
      attachment: 'photo-201644556_457239035'
    }
  })
);
updates.use(
  trigger({
    name: 'программисты шалят',
    regexp: /(программисты шалят|кальян|калик|сиси\+\+)/gim,
    message: {
      message: stripIndents`Программисты шалят🤙🏼😈
    А че, айтишники тоже непрочь календулу с кралями раздуть) Вы не думайте, что это задроты😂 🧑🏻‍🏫Они такую забивку намешают, что любая красотка офигеет😳💨👄 Им только повод дай) А там уж и «Питона» своего покажут, да «СиСи++», если вы понимаете о чем я🤣👍🏼🔞
    
    Кальянчик всех радует: и качков, и очкариков) Главное дуть с кайфом пацаны☝🏼И неважно, какой ты национальности😊`,
      attachment: 'photo-201644556_457239041'
    }
  })
);

updates.start().then(() => stdout.write('✅ cringegen is running'));
