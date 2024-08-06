// @ts-nocheck
import { compileString } from 'sass';
import { SvelteComponent, create_slot, assign, element, set_attributes, insert, update_slot_base, get_all_dirty_from_scope, get_slot_changes, get_spread_update, transition_in, transition_out, detach, compute_rest_props, exclude_internal_props, safe_not_equal, init, listen, stop_propagation, self, trusted, bubble, run_all, HtmlTag, space, empty } from 'svelte/internal';

export interface StyledComponentEvent {
    name: string;
    passive?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    capture?: boolean;
    once?: boolean;
    self?: boolean;
    trusted?: boolean;
}
function hashCode(str: string): string {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
}
export function createSSC(tag: keyof HTMLElementTagNameMap, generateStyle: (props: any) => string, events?: string[]) {
    /*
    function createEvents(div: any, ctx: any, events: StyledComponentEvent[]) {
        return events.map((event, index) => {
            let getMe = (me) => me;
            if (event.stopPropagation) {
                getMe = (me) => stop_propagation(getMe(me));
            }
            if (event.self) {
                getMe = (me) => self(getMe(me));
            }
            if (event.trusted) {
                getMe = (me) => trusted(getMe(me));
            }

            const options = {};
            if (event.passive) {
                options.passive = true;
            }
            else if (event.passive === false) {
                options.passive = false;
            }
            if (event.once) {
                options.once = true;
            }
            if (event.capture) {
                options.capture = true;
            }

            return listen(div, event.name, getMe(ctx[4 + index]), options)
        })
    }
    */
    function createEvents(div: any, ctx: any, events: string[]) {
        return events.map((event, index) => {
            return listen(div, event, ctx[5 + index], true)
        })
    }

    function create_key_block(ctx) {
        let html_tag;
        let html_anchor;
        return {
            c() {
                html_tag = new HtmlTag(false);
                html_anchor = empty();
                html_tag.a = html_anchor;
            },
            m(target, anchor) {
                html_tag.m(

                    ctx[0],
                    target,
                    anchor
                );
                insert(target, html_anchor, anchor);
            },
            p(ctx2, dirty) {
                if (dirty &
                    1) html_tag.p(

                        ctx2[0]
                    );
            },
            d(detaching) {
                if (detaching) {
                    detach(html_anchor);
                    html_tag.d();
                }
            }
        };
    }

    function create_fragment(ctx) {
        let previous_key = (

            ctx[0]
        );
        let t;
        let div;
        let div_class_value;
        let current;
        let mounted;
        let dispose;
        let key_block = create_key_block(ctx);
        const default_slot_template = (
            /*#slots*/
            ctx[4].default
        );
        const default_slot = create_slot(
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[3],
            null
        );
        let div_levels = [
            {
                class: div_class_value = `styled-svelte-${/*hash*/
                    ctx[1]} ` + /*$$restProps*/
                    (ctx[2].class ?? "")
            },
            /*$$restProps*/
            ctx[2]
        ];
        let div_data = {};
        for (let i = 0; i < div_levels.length; i += 1) {
            div_data = assign(div_data, div_levels[i]);
        }
        return {
            c() {
                key_block.c();
                t = space();
                div = element(tag);
                if (default_slot) default_slot.c();
                set_attributes(div, div_data);
            },
            m(target, anchor) {
                key_block.m(target, anchor);
                insert(target, t, anchor);
                insert(target, div, anchor);
                if (default_slot) {
                    default_slot.m(div, null);
                }
                current = true;
                if (!mounted) {
                    dispose = events ? createEvents(div, ctx, events) : [];
                    mounted = true;
                }
            },
            p(ctx2, [dirty]) {
                if (dirty &
                    1 && safe_not_equal(previous_key, previous_key =
                        ctx2[0])) {
                    key_block.d(1);
                    key_block = create_key_block(ctx2);
                    key_block.c();
                    key_block.m(t.parentNode, t);
                } else {
                    key_block.p(ctx2, dirty);
                }
                if (default_slot) {
                    if (default_slot.p && (!current || dirty & /*$$scope*/
                        8)) {
                        update_slot_base(
                            default_slot,
                            default_slot_template,
                            ctx2,
                            /*$$scope*/
                            ctx2[3],
                            !current ? get_all_dirty_from_scope(
                                /*$$scope*/
                                ctx2[3]
                            ) : get_slot_changes(
                                default_slot_template,
                                /*$$scope*/
                                ctx2[3],
                                dirty,
                                null
                            ),
                            null
                        );
                    }
                }
                set_attributes(div, div_data = get_spread_update(div_levels, [
                    (!current || dirty & /*$$restProps*/
                        4 && div_class_value !== (div_class_value = `styled-svelte-${/*hash*/
                            ctx2[1]} ` + /*$$restProps*/
                            (ctx2[2].class ?? ""))) && { class: div_class_value },
                    dirty & /*$$restProps*/
                    4 && /*$$restProps*/
                    ctx2[2]
                ]));
            },
            i(local) {
                if (current) return;
                transition_in(default_slot, local);
                current = true;
            },
            o(local) {
                transition_out(default_slot, local);
                current = false;
            },
            d(detaching) {
                if (detaching) {
                    detach(t);
                    detach(div);
                }
                key_block.d(detaching);
                if (default_slot) default_slot.d(detaching);
                mounted = false;
                run_all(dispose);
            }
        };
    }

    const createHash = () => hashCode(Date.now().toString(16)+tag+JSON.stringify(events))

    function instance($$self, $$props, $$invalidate) {
        let css;
        const omit_props_names = [];
        let $$restProps = compute_rest_props($$props, omit_props_names);
        let { $$slots: slots = {}, $$scope } = $$props;

        const hash = createHash();
        const generateSCSS = (props) => {
            const scss = `${tag}.styled-svelte-${hash}{${generateStyle(props)}}`;
            try {
                const compiledCss = compileString(scss);
                return `<style>${scss}</style>`;
            }
            catch{
                return `<style>${scss}</style>`
            }
        }

        $$self.$$set = ($$new_props) => {
            $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
            $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
            if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
        };
        $$self.$$.update = () => {
            $: $$invalidate(0, css = generateSCSS($$restProps));
        };

        if (events) {
            const handlers: any[] = [];
            for (let i = 0; i < events.length; i++) {
                handlers.push(function (event) {
                    bubble.call(this, $$self, event);
                })
            }
            return [css, hash, $$restProps, $$scope, slots, ...handlers]
        }
        else {
            return [css, hash, $$restProps, $$scope, slots];
        }
    }

    class StyledComponent extends SvelteComponent {
        constructor(options: { target: any; props?: any; }) {
            super();
            init(this, options, instance, create_fragment, safe_not_equal, { style: 1 });
        }
    }

    return StyledComponent
}

export {
    createSSC as styledSvelteComponent
}

export default createSSC;