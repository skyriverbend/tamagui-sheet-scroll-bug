import {
  Button,
  Dialog,
  H1,
  H3,
  Paragraph,
  useMedia,
  Separator,
  Sheet,
  ScrollView,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
  Adapt,
  useWindowDimensions,
} from '@my/ui'
import { useState, useMemo } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-user' : '/user'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      <XStack
        pos="absolute"
        w="100%"
        t="$6"
        gap="$6"
        jc="center"
        fw="wrap"
        $sm={{ pos: 'relative', t: 0 }}
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchRouterButton pagesMode={pagesMode} />
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <YStack gap="$4">
        <H1 ta="center" col="$color12">
          Welcome to Tamagui.
        </H1>
        <Paragraph col="$color10" ta="center">
          Here's a basic starter to show navigating from one screen to another.
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />
      </YStack>

      <Button {...linkProps}>Link to user</Button>

      <SheetDemo />
    </YStack>
  )
}

function LongList() {
  return Array.from({ length: 50 }, (_, i) => (
    <Paragraph key={i} ta="center">
      Fun little list of things we hope you like
    </Paragraph>
  ))
}

function SheetDemo() {
  const media = useMedia()
  const screen = useWindowDimensions()

  const [open, setOpen] = useState(false)

  const sheetListHeight = useMemo(() => {
    const sheetHeight = screen.height * 0.9
    const sheetHeaderHeight = 80
    return sheetHeight - sheetHeaderHeight
  }, [screen])

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>

      <Adapt when="sm">
        <Sheet
          modal
          animation="quick"
          open={open}
          onOpenChange={setOpen}
          snapPoints={[90]}
          dismissOnSnapToBottom
        >
          <Sheet.Overlay animation="quick" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          <Sheet.Handle bg="$gray8" />
          <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
            <YStack gap="$2">
              <Adapt.Contents />
            </YStack>
          </Sheet.Frame>
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay key="overlay" opacity={0.5} />
        <Dialog.Content bordered elevate key="content" gap="$4">
          <H3>This is a fun list</H3>
          {media.gtSm ? (
            <ScrollView h={400}>
              <LongList />
            </ScrollView>
          ) : (
            <Sheet.ScrollView h={sheetListHeight}>
              <LongList />
            </Sheet.ScrollView>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
