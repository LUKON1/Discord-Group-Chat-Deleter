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
