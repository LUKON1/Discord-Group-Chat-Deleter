# Discord-Group-Chat-Deleter

Скрипт для автоматического выхода из всех групповых чатов в веб-версии Discord.
Script to automatically leave all group chats in Discord web app.

---

ВАЖНО / IMPORTANT:

Скрипт работает ТОЛЬКО при использовании английского языка интерфейса Discord в браузере.
The script works ONLY when Discord web interface is set to ENGLISH.

Если язык Discord — не английский, скрипт не найдёт нужные элементы и не сработает.
If Discord language is not English, the script will fail to locate elements and will not work.

---

Инструкция / Instructions:

1. Откройте веб-версию Discord: https://discord.com
   Open Discord web app: https://discord.com

2. Убедитесь, что вы вошли в аккаунт.
   Ensure you are logged in.
   
4. Откройте список личных чатов в самом верху.
    Open the list of private chats at the top.
   
6. Откройте консоль браузера:
   Open browser console:
   - Windows/Linux: Ctrl + Shift + I OR F12
   - Mac: Cmd + Option + I

7. Скопируйте код ниже.
   Copy down code.
```js
   function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function scrollStep(scroller, step=200) {
  scroller.scrollTop += step;
}

async function groupDeleter() {
  const scroller = document.querySelector(
    'div[style*="overflow: hidden"][data-list-id]'
  );
  if (!scroller) {
    console.error("Scroller not found");
    return;
  }
  console.log("Starting...");

  let totalDeleted = 0;
  let noGrowthCount = 0;

  while (noGrowthCount < 3) {
    const currentHeight = scroller.scrollHeight;

    scrollStep(scroller, 200);

    let groupChats = Array.from(
      document.querySelectorAll('li:has(a[aria-label*="group message"])')
    );

    let counterChats = groupChats.length;

    for (const li of groupChats) {
      counterChats -= 1;
      console.log(`count chats:${counterChats}`);
      await delay();

      const closeBtn = li.querySelector('div[aria-label*="Leave Group"]');
      if (closeBtn) {
        closeBtn.click();
        await delay();
      } else {
        console.log("err find close btn");
        continue;
      }

      let leaveBtnsArr = Array.from(
        document.querySelectorAll('div[role="dialog"] button')
      );
      for (const btn of leaveBtnsArr) {
        if (btn.textContent.trim() == "Leave Group") {
          btn.click();
          totalDeleted++;
          await delay();
          break;
        } else {
          console.log("err find leave button");
        }
      }
    }
    if (currentHeight === scroller.scrollHeight && groupChats.length === 0) {
            noGrowthCount++;
        } else {
            noGrowthCount = 0;
        }
  }
  console.log("Finished! All group chats deleted.");
}
groupDeleter();
   ```

6. Вставьте его в консоль и нажмите Enter или нажмите Run кнопку.
   Paste into console and press Enter or press Run button.
   если консоль предупреждает о невозможности вставки, напишите руками "allow pasting" в консоли и нажмите enter или run | if the console warns about the impossibility of       pasting, manually write "allow pasting" in the console and press enter or run.
   
7. Следите за логами — скрипт начнёт прокручивать список и выходить из чатов.
   Watch console logs — script will scroll and process group chats.

---

Предупреждения / Warnings:

- Не обновляйте страницу во время работы скрипта.
  Do not refresh the page during execution.

- Не взаимодействуйте с интерфейсом Discord вручную во время работы.
  Do not manually interact with Discord UI during execution.

- Скрипт покидает групповые чаты БЕЗВОЗВРАТНО.
  Script leaves group chats PERMANENTLY.

---
