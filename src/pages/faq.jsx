import React from "react";
import { PageWrap } from "~/features/ui";
import { Header } from "~/features/ui";
import { Accordion } from "~/features/ui";
import { Footer } from "~/features/ui";


export default function FAQ() {
  return (
    <PageWrap
      content={
        <>
          <Header />
          <main>
            <article>
              <div className="wrapper">
                <h2 className="standard-heading">FAQ</h2>
                <div className="formatted-article">

                  <section>
                    <h3>About Toontown</h3>
                    <Accordion
                      title="What is Toontown?"
                    >
                      <p>
                        Toontown Online was an MMORPG, initially developed by Disney and Schell Games in 2003.
                        After Disney shut down Toontown in 2013, various fan-made, free-to-use revivals of the game eventually popped up.
                      </p>
                      <p>
                        One of the most popular of these revival servers is Toontown Rewritten, which began development only months after Toontown Online shut down, and strives to be as close to the original Toontown as possible.
                      </p>
                    </Accordion>
                    <Accordion
                      title="What does this website do for Toontown?"
                    >
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
                    </Accordion>
                    <Accordion
                      title="Does this website work for Toontown: Corporate Clash?"
                    >
                      <p>
                        At this time, Gag Combos Info only provides information about Toontown Rewritten, 
                        and does NOT provide info about Corporate Clash or any other Toontown servers.
                        However, this website is still in development, and we hope to support CC in the future!
                      </p>
                    </Accordion>
                    <Accordion
                      title="What other resources besides Gag Combos Info can I use?"
                    >
                      <p>
                        <b>
                          There are plenty of great resources in this community that can help you learn the ropes!
                        </b>
                      </p>
                      <p>
                        For organizing in-game groups, tracking cog invasions, and more:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://toonhq.org/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            toonhq<wbr/>.org
                          </a>
                        </li>
                      </ul>
                      <p>
                        Other fan-made resources similar to Gag Combos Info:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://big.brain.town/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            big<wbr />.brain<wbr />.town
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://zzzachzzz.github.io/toontown-combos/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            zzzachzzz<wbr />.github<wbr />.io/<wbr />toontown-combos
                          </a>
                        </li>
                      </ul>
                      <p>
                        For an overview of Toontown's battle mechanics:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://toontownrewritten.wiki/Gags"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            toontownrewritten.wiki/<wbr />Gags
                          </a>
                        </li>
                      </ul>
                      <p>
                        For an in-depth look into Toontown's battle mechanics:
                      </p>
                      <ul>
                        <li>
                          <a
                            href="https://github.com/QED1224/Toontown-Resources/blob/master/README.md"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            github.com/<wbr />QED1224/<wbr />Toontown-Resources/<wbr />blob/<wbr />master/<wbr />README.md
                          </a>
                        </li>
                      </ul>

                    </Accordion>
                  </section>

                  <section>
                    <h3>Calculator Page</h3>
                    <Accordion
                      title="How do I use this website&apos;s Calculator Page?"
                    >
                      <ul>
                        <li>Select gags for your combo from the Gags Picker.</li>
                        <li>Use the organic toggle if you want to choose organic gags.</li>
                        <li>Use the v2.0 toggle to toggle whether your cog is v2.0.</li>
                        <li>The Calculator page will calculate your combo's Total Damage, and indicate which level cogs it will defeat.</li>
                        <li>Clear your choices one-by-one by clicking the red "X" on your chosen gags, or clear them all at once by clicking "Reset Gags".</li>
                      </ul>
                    </Accordion>
                  </section>

                  <section>
                    <h3>Recommendations Page</h3>
                    <Accordion
                      title="How do I use this website&apos;s Recommendations Page?"
                    >
                      <ul>
                        <li>
                          Configure the number of toons and their organic gags using the "Toons" section.
                        </li>
                        <li>
                          Use the "Cog" section to set the cog level and whether or not it is currently lured or v2.0.
                        </li>
                        <li>
                          The "Combos" section will display the gag combos that will defeat your cog!
                        </li>
                        <li>
                          You can use the combos section filters to display only certain types of combos
                          or to filter out gag tracks you don't want to use. 
                          You can also choose how you want the displayed combos to be sorted.
                        </li>
                      </ul>
                    </Accordion>
                    <Accordion
                      title="How are &quot;Basic&quot; Combos Chosen on the Recommendations Page?"
                    >
                      <p>
                        "Basic" Gag Combos are combos where all toons use the same gag track.
                      </p>
                    </Accordion>
                    <Accordion
                      title="How are &quot;Best&quot; Combos Chosen on the Recommendations Page?"
                    >
                      <p>
                        "Best" Gag Combos are arbitrarily defined as combos that meet the following criteria: 
                      </p>
                      <ol>
                        <li>
                          The combo's accuracy is in the top 10% of all generated combos.*
                        </li>
                        <li>
                          The combo's damage is in the bottom 25% of all generated combos.*
                        </li>
                        <li>
                          The combo is not flagged as "bad" based on the utilized tracks,
                          which happens for Drop-Only Combos (due to low accuracy),
                          and Sound-on-Lured-Cogs-before-Throw-or-Squirt 
                          (due to it preventing lured knockback damage).
                          Note that Sound-Only-on-Lured-Cogs is not flagged 
                          since a successful Lure gives the Sound 100% accuracy.
                        </li>
                      </ol>
                      <p>
                        * In cases where the number of combos meeting this criterion is less than 3,
                        this value will be shifted such that at least 3 combos will meet it (assuming there are at least 3 total combos).
                        Since both Accuracy and Damage are required to meet their respective percentiles,
                        the output generated may still be less than 3.
                      </p>
                    </Accordion>
                    <Accordion
                      title="How is each Combo&apos;s accuracy calculated on the Recommendations Page?"
                    >
                      <p>
                        In Toontown Rewritten, the probability that a gag hits a
                        cog is called <code>atkAcc</code>, or attack accuracy, 
                        and is defined by the equation <code>
                          atkAcc = propAcc + trackExp + tgtDef + bonus
                        </code>.
                        You can <a
                          href="https://github.com/QED1224/Toontown-Resources/blob/master/README.md#toon-atk-acc"
                          target="_blank" rel="noopener noreferrer"
                        >
                          read about the specifics of this equation here
                        </a>.
                      </p>
                      <p>
                        Gag Combos Info (in its current state) must make some assumptions in this equation for each gag in a recommended gag combo 
                        in order to get the probability of the entire combo. Those assumptions are as follows:
                      </p>
                      <ul>
                        <li>
                          <p>
                            <code>propAcc</code> for Lure gags is based on the cog level.
                            A recommended combos' Lure gag is chosen using the following table:
                          </p>
                          <br />
                          <table>
                            <thead>
                              <tr>
                                <th>Cog Level</th>
                                <th>Lure Level</th>
                                <th>propAcc</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>50%-60%</td>
                              </tr>
                              <tr>
                                <td>2-3</td>
                                <td>2</td>
                                <td>50%-60%</td>
                              </tr>
                              <tr>
                                <td>4-5</td>
                                <td>3</td>
                                <td>60%-70%</td>
                              </tr>
                              <tr>
                                <td>6-8</td>
                                <td>4</td>
                                <td>60%-70%</td>
                              </tr>
                              <tr>
                                <td>9-13</td>
                                <td>5</td>
                                <td>70%-80%</td>
                              </tr>
                              <tr>
                                <td>14-17</td>
                                <td>6</td>
                                <td>70%-80%</td>
                              </tr>
                              <tr>
                                <td>18-20</td>
                                <td>7</td>
                                <td>95%</td>
                              </tr>
                            </tbody>
                          </table>
                          <br />
                          <p>
                            Lure gags have an accuracy that varies from 50% to 95%, 
                            so this choice does affect combo accuracy, but is more reasonable to gameplay, 
                            as it doesn't over-recommend high-level Lure gags.
                          </p>
                        </li>
                        <li>
                          <p>
                            <code>trackExp</code> is assumed to be at its maximum value of 60.
                          </p>
                          <p>
                            Although this assumption inflates the probabilities of low-level gag combos,
                            it gives more accurate probabilities relating to end-game scenarios 
                            where high-level gag combos may utilize low-level gags.
                          </p>
                        </li>
                        <li>
                          <p>
                            <code>tgtDef</code> is capped at its level 12 value for level 13+ cogs.
                          </p>
                          <p>
                            Toontown Rewritten support confirmed via email on 2023-07-10 that level 13+ tgtDef values
                            are being kept secret to keep the mystery in Field Offices (the only in-game area containing level 13+ cogs).
                            They also warned that these values are occasionally tweaked and are subject to change,
                            and that anyone claiming to know these values may be incorrect. Thus, Gag Combos Info 
                            disregards hearsay that level 20 tgtDef is -65, instead opting to cap tgtDef at -55 for all 13+ cogs until further notice.
                          </p>
                        </li>
                        <li>
                          <p>
                            <code>prevHits</code> assumes all previous gags in the combo have hit.
                            This is a necessary assumption to the probability that the entire combo is successful.
                          </p>
                        </li>
                        <li>
                          <p>
                            <code>luredRatio</code> assumes that there is exactly 1 cog in the battle.
                            This is because the recommendations page recommends combos based on a single cog.
                          </p>
                        </li>
                      </ul>
                      <p>
                        After obtaining each gag's probability, Gag Combos Info multiplies the gag probabilities together,
                        using only the maximum gag probability from groups of gags in the same track.
                        Lastly, this number is rounded to 1 decimal place.
                      </p>
                    </Accordion>
                  </section>

                </div>
              </div>
            </article>
          </main>
          <Footer />
        </>
      } 
    />
  );
}
