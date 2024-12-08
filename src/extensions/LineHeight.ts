import { Extension } from '@tiptap/core';


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        lineHeight: {
            setLineHeight: ( lineHeight: string ) => ReturnType;
            unsetLineHeight: () => ReturnType;
        };
    }
}

export const LineHeight = Extension.create( {
    name: 'lineHeight',
    addOptions: () => ( {
        types: [ 'heading', 'paragraph' ],
        defaultLineHeight: 'normal',
    } ),
    addGlobalAttributes () {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        renderHTML: ( attributes ) => {
                            if ( !attributes.lineHeight ) {
                                return {};
                            }
                            return {
                                style: `line-height: ${ attributes.lineHeight }`
                            };
                        },
                        parseHTML: ( element ) => {
                            return {
                                lineHeight: element.style.lineHeight || this.options.defaultLineHeight
                            };
                        },
                    }
                }
            }
        ];
    },
    addCommands () {
        return {
            setLineHeight: ( lineHeight ) => ( { tr, state, dispatch } ) => {
                const { selection } = state;
                tr = tr.setSelection( selection );
                const { from, to } = selection;

                state.doc.nodesBetween( from, to, ( node, pos ) => {
                    if ( this.options.types.includes( node.type.name ) ) {
                        tr = tr.setNodeMarkup( pos, undefined, { ...node.attrs, lineHeight } );
                    }
                } );

                if ( dispatch ) {
                    dispatch( tr );
                }
                return true;
            },
            unsetLineHeight: () => ( { tr, state, dispatch } ) => {
                const { selection } = state;
                tr = tr.setSelection( selection );
                const { from, to } = selection;
                state.doc.nodesBetween( from, to, ( node, pos ) => {
                    if ( this.options.types.includes( node.type.name ) ) {
                        tr = tr.setNodeMarkup( pos, undefined, { ...node.attrs, lineHeight: this.options.defaultLineHeight } );
                    }
                } );

                if ( dispatch ) {
                    dispatch( tr );
                }
                return true;
            }
        };
    }
} );