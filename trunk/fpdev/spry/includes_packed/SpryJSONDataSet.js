// SpryJSONDataSet.js - version 0.4 - Spry Pre-Release 1.6
//
// Copyright (c) 2007. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7.8.c=s(1I,1H){3.a="";3.L=1J;3.N=C;3.p=[];3.1C=1J;3.1v=C;7.8.1F.2n(3,1I,1H);2 1r=q 3.p;4(1r=="1p"||(1r=="x"&&3.p.K!=Q))3.p=[3.p]};7.8.c.E=B 7.8.1F();7.8.c.E.K=7.8.c;7.8.c.E.2d=s(){2 W=[];4(3.1G)W.y(3.1G);4(3.a)W.y(3.a);4(3.1u&&3.1u.1K)W.y(3.1u.1K);o W};7.8.c.E.25=s(){o 3.N};7.8.c.E.28=s(){o 3.a};7.8.c.E.29=s(a){4(3.a!=a){3.a=a;4(3.1S&&3.N){3.2c("2b");3.24(3.N)}}};7.8.c.12=s(a,w){2 S=[];4(a&&w){2 h="";2 14="";2 15=a.1X(/\\./);4(15!=-1){h=a.1Q(0,15);14=a.1Q(15+1)}D h=a;2 m=[];4(h&&q w=="x"){2 6=w[h];2 H=q 6;4(H!=23&&H!=C){4(6&&H=="x"&&6.K==Q)m=m.10(6);D m.y(6)}}2 P=m.A;4(14){f(2 i=0;i<P;i++)S=S.10(7.8.c.12(14,m[i]))}D S=m}o S};7.8.c.1w=s(6,1l){2 1E=1l?1l:"1h";2 5=B J;2 H=q 6;4(H=="x")7.8.c.1i(5,6);D 5[1E]=6;5.1Y=6;o 5};7.8.c.1i=s(13,R,1M){4(R&&13){f(2 h T R){4(1M&&q R[h]=="x")2a;13[h]=R[h]}}o 13};7.8.c.1g=s(w,a,L){2 b=B J;b.d=[];b.z={};4(!a)a="";2 6=w;2 H=q 6;2 1m="";4(H!="x"||!6){4(6!=C){2 5=B J;5.1h=6;5.G=0;b.d.y(5);b.z[5.G]=5}o b}2 m=[];4(6.K==Q){2 U=6.A;4(U<1)o b;2 1N=q 6[0];4(1N!="x"){f(2 i=0;i<U;i++){2 5=B J;5.1h=6[i];5.G=i;b.d.y(5);b.z[5.G]=5}o b}4(6[0].K==Q)o b;4(a){f(2 i=0;i<U;i++)m=m.10(7.8.c.12(a,6[i]))}D{f(2 i=0;i<U;i++)m.y(6[i])}}D{4(a)m=7.8.c.12(a,6);D m.y(6)}2 P=m.A;4(a&&P>=1&&q m[0]!="x")1m=a.1Z(/.*\\./,"");4(!L){f(2 i=0;i<P;i++){2 5=7.8.c.1w(m[i],1m,L);5.G=i;b.z[i]=5;b.d.y(5)}}D{2 1O=0;f(2 i=0;i<P;i++){2 6=m[i];2 1a=[];2 17=0;f(2 16 T 6){2 h=6[16];2 1y=q h;4(1y==\'x\'&&h.K==Q){1a.y(16);17=2i.2j(17,6[16].A)}}2 1z=1a.A;f(2 j=0;j<17;j++){2 5=B J;f(2 k=0;k<1z;k++){2 1q=1a[k];5[1q]=6[1q][j]}5.G=1O++;b.z[i]=5;b.d.y(5)}}}o b};7.8.c.E.1n=s(b,p){4(!b||!p)o;2 11=p.A;4(11<1)o;2 d=b.d;2 z={};2 19=[];2 1b=[];2 1t=[];f(2 i=0;i<11;i++){2 F=p[i];4(q F=="x"){1t[i]=F.L;F=F.a}4(!F)F="";19[i]=7.8.1L.1A(C,F,3.1W);1b[i]=19[i].1Z(/\\[.*\\]/g,"")}2 5;2 X=d.A;2 Y=[];f(2 i=0;i<X;i++){5=d[i];2 V=[5];f(2 j=0;j<11;j++){2 M=7.8.c.1g(5.1Y,19[j],1t[j]);4(M&&M.d&&M.d.A){4(q p[j]=="x"&&p[j].p){2 I=p[j].p;18=q I;4(18=="1p")I=[I];D 4(18=="x"&&18.K==J)I=[I];3.1n(M,I)}2 1o=M.d;2 1U=1o.A;2 1c=1b[j]+".";2 1V=V.A;2 1f=[];f(2 k=0;k<1V;k++){2 1T=V[k];f(2 l=0;l<1U;l++){2 Z=B J;2 1k=1o[l];f(2 h T 1k){2 1j=1c+h;4(1c==h||1c.1X(B 2o("\\\\."+h+"\\\\.$"))!=-1)1j=1b[j];Z[1j]=1k[h]}7.8.c.1i(Z,1T);1f.y(Z)}}V=1f}}Y=Y.10(V)}d=Y;X=d.A;f(i=0;i<X;i++){5=d[i];5.G=i;z[5.G]=5}b.d=d;b.z=z};7.8.c.E.1D=s(1s,1d){1B{4(/^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+2l-u \\n\\r\\t])+?$/.27(1s)){2 j=1x(\'(\'+1s+\')\');4(q 1d===\'s\'){s 1e(k,v){4(v&&q v===\'x\'){f(2 i T v){4(v.26(i)){v[i]=1e(i,v[i])}}}o 1d(k,v)}j=1e(\'\',j)}o j}}1R(e){}2k B 2f("2h 2p 2q 20 1p.")};7.8.c.E.1P=s(O){4(3.1v)O=3.1v(3,O);2 w;1B{w=3.1C?3.1D(O):1x("("+O+")")}1R(e){7.2e.2m("2g 22 T c.1P: "+e);w={}}4(w==C)w="C";2 b=7.8.c.1g(w,7.8.1L.1A(C,3.a,3.1W),3.L);3.1n(b,3.p);3.N=O;3.21=w;3.d=b.d;3.z=b.z;3.1S=(3.N!=C)};',62,151,'||var|this|if|row|obj|Spry|Data||path|rs|JSONDataSet|data||for||prop|||||matches||return|subPaths|typeof||function||||jsonObj|object|push|dataHash|length|new|null|else|prototype|subPath|ds_RowID|objType|sp|Object|constructor|pathIsObjectOfArrays|newRS|doc|rawDataDoc|numMatches|Array|srcObj|results|in|arrLen|newRows|strArr|numRows|newData|newRowObj|concat|numSubPaths|getMatchingObjects|dstObj|leftOverPath|offset|propName|maxNumRows|spType|pathArray|colNames|cleanedPathArray|cleanedPath|filter|walk|joinedRows|flattenDataIntoRecordSet|column0|copyProps|newPropName|newRSRow|basicColumnName|basicColName|flattenSubPaths|newRSData|string|colName|jwType|str|isObjectOfArraysArr|requestInfo|preparseFunc|flattenObject|eval|propyType|numColNames|processDataRefString|try|useParser|parseJSON|basicName|HTTPSourceDataSet|url|dataSetOptions|dataSetURL|false|postData|Region|suppressObjProps|eleType|rowID|loadDataIntoDataSet|substring|catch|dataWasLoaded|newRow|numRSRows|numNewRows|dataSetsForDataRefStrings|search|ds_JSONObject|replace|JSON|docObj|exception|undefined|setDataFromDoc|getDocument|hasOwnProperty|test|getPath|setPath|continue|onPreLoad|notifyObservers|getDataRefStrings|Debug|Error|Caught|Failed|Math|max|throw|Eaeflnr|reportError|call|RegExp|to|parse'.split('|'),0,{}))
