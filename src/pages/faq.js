import React from 'react';
import Header from 'features/ui/header';
import Footer from 'features/ui/footer';

export default function FAQ() {
  return (
    <div id='page' className='faq custom-scrollbar with-grid-bg'>
      <Header />

      <article id="faq-entries">
        <div className='wrapper'>
          <h2 className='standard-heading'>FAQ</h2>
          <div className='formatted-article'>
            <section>
              <h3>What is Toontown?</h3>
              <p>
                Toontown Online was an MMORPG, initially developed by Disney and Schell Games in 2003.
                After Disney shut down Toontown in 2013, various fan-made, free-to-use revivals of the game eventually popped up.
              </p>
              <p>
                One of the most popular of these revival servers is Toontown Rewritten, which began development only months after Toontown Online shut down, and strives to be as close to the original Toontown as possible.
              </p>
            </section>
            <section>
              <h3>What does this website do for Toontown?</h3>
              <p>
                Toontown players play as "Toons", and engage in turn-based battles with enemies known as "Cogs".
                In these battles, Toons attempt to defeat Cogs using combinations of "gags". The cog deals damage to the players each round until it is defeated, or until the players' toons "go sad".
              </p>
              <p>
                This website's "Calculator" page lets you select any combination of gags and shows you which cogs it will defeat.
              </p>
              <p>
                This website's "Recommendations" page finds the optimal combinations of gags that can defeat a cog in one round, based on a number of different factors that you input.
              </p>
            </section>
            <section>
              <h3>How do I use this website's Calculator Page?</h3>
              <ul>
                <li>Select gags for your combo from the Gags Picker.</li>
                <li>Use the organic toggle if you want to choose organic gags.</li>
                <li>Use the v2.0 toggle to toggle whether your cog is v2.0.</li>
                <li>The Calculator page will calculate your combo's Total Damage, and indicate which level cogs it will defeat.</li>
                <li>Clear your choices one-by-one by clicking the red "X" on your chosen gags, or clear them all at once by clicking "Reset Gags".</li>
              </ul>
            </section>
            <section>
              <h3>How do I use this website's Recommendations Page?</h3>
              <ul>
                <li>
                  Configure the number of toons and their organic gags using the "Toons" section.
                </li>
                <li>
                  Use the "Cog" section to set the cog level and whether or not it is currently lured.
                </li>
                <li>
                  The "Combos" section will display the gag combos that will defeat your cog!
                </li>
                <li>
                  You can use the combos section filters to display only certain types of combos
                  or to filter out gag tracks you don't want to use.
                </li>
              </ul>
            </section>
            <section>
              <h3>Does this Tool Work for Toontown: Coporate Clash?</h3>
              <p>
                At this time, Gag Combos Info does NOT provide info about Corporate Clash, or any other Toontown servers.
                However, this website is very early in its development, and we do have plans to support CC in the future!
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
