import { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View, Pressable, TextInput } from 'react-native';
import PageLayout from '../PageLayout';
import { useTheme } from '../../shared/themeContext/ThemeContext';
import { catalog } from '../../shared/disconnected/catalog';
import { useDeviceLibrary } from '../../shared/disconnected/useDeviceLibrary';
import { workspacePages, adminPages, accountPages, type WorkspacePage } from '../../shared/disconnected/routes';

const AccountWorkspace = ({ page }: { page: WorkspacePage }) => {
  const { palette } = useTheme();
  const { data, ready, busy, error, update, clear } = useDeviceLibrary();
  const [name, setName] = useState(``);
  const [query, setQuery] = useState(``);
  const [selected, setSelected] = useState(``);
  const [preview, setPreview] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const disabled = !ready || busy;
  const text = { color: palette.ink, lineHeight: 24 };
  const button = (id: string, label: string, action?: () => void, allowUnavailable = false) => <Pressable key={id} nativeID={id} accessibilityRole={`button`} accessibilityState={{ disabled: !action || busy || (!ready && !allowUnavailable) }} disabled={!action || busy || (!ready && !allowUnavailable)} onPress={action} style={{ padding: 12, marginVertical: 6, borderWidth: 1, borderColor: palette.line, opacity: !action || busy || (!ready && !allowUnavailable) ? .5 : 1 }}><Text style={text}>{label}</Text></Pressable>;
  const list = data.lists.find(item => item.id === selected);
  const input = { padding: 12, borderWidth: 1, borderColor: palette.line, color: palette.ink, marginVertical: 10 };
  return <PageLayout id={`workspace-${page}`} title={workspacePages[page]} description={`Device-local workspace. No accounts, cloud sync or verified owner access.`}>
    <View nativeID={`workspace-navigation`} style={{ gap: 12 }}>{[...accountPages, ...adminPages].map(key => <Link key={key} href={`/${key}`} style={{ color: palette.red }}>{workspacePages[key]}{adminPages.includes(key) ? ` · Preview` : ``}</Link>)}</View>
    <View style={{ paddingVertical: 24, gap: 12 }}><Text style={text}>Saved data stays on this installation. Clearing storage loses it; it is not a cloud backup.</Text>{error && <Text accessibilityRole={`alert`} style={text}>{error}</Text>}
    {adminPages.includes(page) ? <><Text style={text}>Internal layout preview only. No real users, owner rights or provider metrics.</Text>{button(`open-preview`, preview ? `Close preview` : `Open layout preview`, () => setPreview(!preview))}{preview && <><Text style={text}>{workspacePages[page]} · unavailable</Text><Text style={text}>Database and server-side reporting are not connected.</Text>{button(`refresh-preview`, `Refresh (unavailable)`)}</>}</>
    : page === `saved` || page === `collections` ? <><TextInput accessibilityLabel={`Search catalog`} value={query} onChangeText={setQuery} style={input} maxLength={120} />{page === `collections` && <><TextInput accessibilityLabel={`Collection name`} value={name} onChangeText={setName} maxLength={80} style={input} />{button(`create-collection`, `＋ Create device collection`, name.trim() && data.lists.length < 100 ? () => { const id = `list_${Date.now()}_${Math.random().toString(36).slice(2,10)}`; void update({ ...data, lists: [...data.lists, { id, name: name.trim(), items: [] }] }); setSelected(id); setName(``); } : undefined)}{data.lists.map(item => button(`list-${item.id}`, `${selected === item.id ? `✓ ` : ``}${item.name} (${item.items.length})`, () => setSelected(item.id)))}{list && button(`remove-collection`, `Remove selected device collection`, () => { void update({ ...data, lists: data.lists.filter(item => item.id !== list.id) }); setSelected(``); })}{button(`share-collection`, `Share with friends (requires backend)`)}</>}<Text style={text}>{data.favorites.length} device favorites. Browse existing entries below.</Text>{catalog.filter(item => `${item.name} ${item.detail}`.toLowerCase().includes(query.toLowerCase())).map(item => <View key={item.id} nativeID={`library-${item.id}`} style={{ padding: 14, borderWidth: 1, borderColor: palette.line }}><Text style={text}>{item.name} · {item.detail}</Text><Link href={item.path as never} style={{ color: palette.red }}>View entry</Link>{button(`favorite-${item.id}`, data.favorites.includes(item.id) ? `♥ Remove favorite` : `♡ Save favorite`, () => void update({ ...data, favorites: data.favorites.includes(item.id) ? data.favorites.filter(id => id !== item.id) : [...data.favorites, item.id] }))}{list && button(`membership-${item.id}`, list.items.includes(item.id) ? `Remove from collection` : `Add to collection`, () => void update({ ...data, lists: data.lists.map(record => record.id === list.id ? { ...record, items: record.items.includes(item.id) ? record.items.filter(id => id !== item.id) : [...record.items, item.id] } : record) }))}</View>)}</>
    : page === `profile` || page === `settings` ? <><Text style={text}>Device label: {data.displayName || `Not set`}. This is not an identity.</Text><TextInput accessibilityLabel={`Device display label`} value={name} onChangeText={setName} maxLength={80} style={input} />{button(`save-label`, `Save device label`, () => void update({ ...data, displayName: name.trim() }))}{button(`avatar`, `Upload avatar (requires backend)`)}{button(`clear-library`, `Clear device library`, () => setConfirm(true), true)}{confirm && <><Text style={text}>Permanently remove this device library? No cloud backup exists.</Text>{button(`confirm-clear`, `Clear library`, () => { void clear(); setConfirm(false); }, true)}{button(`cancel-clear`, `Cancel`, () => setConfirm(false), true)}</>}</>
    : page === `guidelines` ? <Text style={text}>Use original summaries, identify sources and respect content rights. Submissions are not sent or published yet.</Text>
    : <><Text style={text}>Firebase Authentication and private connections are not configured. No credentials are accepted or stored.</Text>{button(`google-auth`, `Google sign-in (unavailable)`)}{button(`email-auth`, `Email/password (unavailable)`)}<Link href={`/signin`}>Sign In</Link><Link href={`/signup`}>Sign Up</Link><Link href={`/reset-password`}>Reset password</Link></>}
    </View>
  </PageLayout>;
};
export default AccountWorkspace;
